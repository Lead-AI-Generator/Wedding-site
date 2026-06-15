'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const EVENT_OPTIONS = [
  { id: 'haldi', label: 'Haldi', sublabel: 'Mon, Dec 1 — Morning · Venue TBC' },
  { id: 'mehndi', label: 'Mehndi', sublabel: 'Mon, Dec 1 — Evening · Venue TBC' },
  { id: 'sangeet', label: 'Sangeet', sublabel: 'Tue, Dec 2 — Evening · Shiv Shankar Gardens' },
  { id: 'baraat', label: 'Baraat & Ceremony', sublabel: 'Wed, Dec 3 — Morning · Pacific Gardens' },
];

const schema = yup.object({
  primaryGuest: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid email').nullable().optional(),
  side: yup
    .mixed<'bride' | 'groom'>()
    .oneOf(['bride', 'groom'], 'Please select which side you are from')
    .required('Please select which side you are from'),
  events: yup
    .array(yup.string().required())
    .min(1, 'Please select at least one event')
    .required(),
  guestCount: yup
    .number()
    .min(0, 'Cannot be negative')
    .max(9, 'Maximum 9 additional guests')
    .required()
    .default(0),
  additionalGuests: yup
    .array(yup.object({ name: yup.string().required('Guest name is required') }))
    .optional(),
  dietaryNotes: yup.string().nullable().optional(),
});

type FormData = {
  primaryGuest: string;
  email?: string | null;
  side: 'bride' | 'groom';
  events: string[];
  guestCount: number;
  additionalGuests?: { name: string }[];
  dietaryNotes?: string | null;
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function RSVPForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: { guestCount: 0, events: [], additionalGuests: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'additionalGuests' });
  const guestCount = watch('guestCount') ?? 0;

  const handleGuestCountChange = (value: number) => {
    const current = fields.length;
    if (value > current) {
      for (let i = current; i < value; i++) append({ name: '' });
    } else {
      for (let i = current; i > value; i--) remove(i - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryGuest: data.primaryGuest,
          email: data.email || null,
          side: data.side,
          events: data.events,
          guestCount: (data.guestCount ?? 0) + 1,
          guestNames: JSON.stringify([
            data.primaryGuest,
            ...(data.additionalGuests?.map((g) => g.name) ?? []),
          ]),
          dietaryNotes: data.dietaryNotes || null,
        }),
      });

      if (!res.ok) throw new Error('Server error');
      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="rsvp-form-wrap text-center">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
        <h3 className="section-heading cream-text" style={{ marginBottom: '0.75rem' }}>
          You&apos;re on the list!
        </h3>
        <p className="muted-text" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
          Thank you for your RSVP. We can&apos;t wait to celebrate with you in Ahmedabad. More
          details will follow closer to December.
        </p>
        <div className="gold-divider" style={{ margin: '1.5rem auto' }} />
        <p className="gold-text" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.15em', fontSize: '0.8rem' }}>
          JATIN &amp; ANUSHI
        </p>
      </div>
    );
  }

  return (
    <div className="rsvp-form-wrap">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Primary Guest Name */}
        <div className="mb-4">
          <label className="form-label-wedding" htmlFor="primaryGuest">
            Your Full Name *
          </label>
          <input
            id="primaryGuest"
            type="text"
            className="form-control-wedding w-100"
            placeholder="e.g. Priya Sharma"
            {...register('primaryGuest')}
          />
          {errors.primaryGuest && (
            <span className="form-error">{errors.primaryGuest.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="form-label-wedding" htmlFor="email">
            Email Address (optional)
          </label>
          <input
            id="email"
            type="email"
            className="form-control-wedding w-100"
            placeholder="For your own reference"
            {...register('email')}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>

        {/* Side */}
        <div className="mb-4">
          <label className="form-label-wedding">Which side are you from? *</label>
          <div className="form-check-wedding" style={{ marginBottom: '0.5rem' }}>
            <input
              type="radio"
              id="side-bride"
              value="bride"
              {...register('side')}
            />
            <label htmlFor="side-bride">
              <span style={{ color: 'var(--color-cream-text)', fontWeight: 400 }}>
                Bride&apos;s Family &amp; Friends
              </span>
              <br />
              <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                Anushi&apos;s side
              </span>
            </label>
          </div>
          <div className="form-check-wedding">
            <input
              type="radio"
              id="side-groom"
              value="groom"
              {...register('side')}
            />
            <label htmlFor="side-groom">
              <span style={{ color: 'var(--color-cream-text)', fontWeight: 400 }}>
                Groom&apos;s Family &amp; Friends
              </span>
              <br />
              <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                Jatin&apos;s side
              </span>
            </label>
          </div>
          {errors.side && <span className="form-error">{errors.side.message}</span>}
        </div>

        {/* Events */}
        <div className="mb-4">
          <label className="form-label-wedding">Events Attending *</label>
          {EVENT_OPTIONS.map((event) => (
            <div key={event.id} className="form-check-wedding">
              <input
                type="checkbox"
                id={`event-${event.id}`}
                value={event.id}
                {...register('events')}
              />
              <label htmlFor={`event-${event.id}`}>
                <span style={{ color: 'var(--color-cream-text)', fontWeight: 400 }}>
                  {event.label}
                </span>
                <br />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                  {event.sublabel}
                </span>
              </label>
            </div>
          ))}
          {errors.events && <span className="form-error">{errors.events.message}</span>}
        </div>

        {/* Additional guests count */}
        <div className="mb-4">
          <label className="form-label-wedding" htmlFor="guestCount">
            Additional Guests (not including yourself)
          </label>
          <input
            id="guestCount"
            type="number"
            min={0}
            max={9}
            className="form-control-wedding"
            style={{ width: '120px' }}
            {...register('guestCount', {
              onChange: (e) => handleGuestCountChange(Number(e.target.value)),
            })}
          />
          {errors.guestCount && (
            <span className="form-error">{errors.guestCount.message}</span>
          )}
        </div>

        {/* Additional guest names */}
        {fields.length > 0 && (
          <div className="mb-4">
            <label className="form-label-wedding">Additional Guest Names</label>
            {fields.map((field, i) => (
              <div key={field.id} style={{ marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="form-control-wedding w-100"
                  placeholder={`Guest ${i + 2} full name`}
                  {...register(`additionalGuests.${i}.name`)}
                />
                {errors.additionalGuests?.[i]?.name && (
                  <span className="form-error">
                    {errors.additionalGuests[i]?.name?.message}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Dietary */}
        <div className="mb-5">
          <label className="form-label-wedding" htmlFor="dietaryNotes">
            Dietary Requirements &amp; Allergies (optional)
          </label>
          <textarea
            id="dietaryNotes"
            rows={3}
            className="form-control-wedding w-100"
            placeholder="e.g. One guest is vegan, one has a nut allergy"
            {...register('dietaryNotes')}
          />
        </div>

        {submitState === 'error' && (
          <div
            className="mb-3 text-center"
            style={{ color: '#e07070', fontSize: '0.85rem' }}
          >
            Something went wrong — please try again or email us directly.
          </div>
        )}

        <button type="submit" className="btn-gold" disabled={submitState === 'submitting'}>
          {submitState === 'submitting' ? 'Sending…' : 'Send RSVP'}
        </button>
      </form>
    </div>
  );
}
