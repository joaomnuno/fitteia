import React from "react";

export function Input({ label, value, onChange, className = "", type = "text" }: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  type?: string;
}) {
  return (
    <div className={`min-w-[8rem] ${className}`}>
      {label ? <label className="label">{label}</label> : null}
      <input className="input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function NumberInput({ label, value, onChange, className = "" }: {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  className?: string;
}) {
  return (
    <div className={`min-w-[8rem] ${className}`}>
      {label ? <label className="label">{label}</label> : null}
      <input
        className="input"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, rows = 6, className = "", hint }: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={className}>
      {label ? <label className="label">{label}</label> : null}
      <textarea className="textarea" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint ? <div className="mt-1 text-xs text-neutral-500">{hint}</div> : null}
    </div>
  );
}

export function Select({ label, value, onChange, options, className = "" }: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={`min-w-[10rem] ${className}`}>
      {label ? <label className="label">{label}</label> : null}
      <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function RadioGroup({ name, value, onChange, options }: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex items-center gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
            className="accent-neutral-900"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}
