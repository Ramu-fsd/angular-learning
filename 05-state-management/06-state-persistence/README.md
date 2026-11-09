# State persistence and rehydration

Persistence is a design decision, not a default requirement. Decide what must survive a refresh and which storage boundary is appropriate.

| State | Typical approach | Notes |
|---|---|---|
| Search text / open panel | Component state | Usually do not persist |
| User display preferences | Local storage | Avoid secrets |
| Large server datasets | Refetch or managed cache | Consider freshness and invalidation |
| Authentication credentials | Secure, approved auth design | Never put tokens/passwords in local storage by default |
| Financial transaction records | Backend source of truth | Browser copy is not authoritative |

## Safe preference example

```ts
const STORAGE_KEY = 'banking-dashboard-preferences';

export interface DashboardPreferences {
  compactMode: boolean;
  preferredCurrency: 'INR' | 'USD';
}

export function loadPreferences(): DashboardPreferences {
  const fallback: DashboardPreferences = {
    compactMode: false,
    preferredCurrency: 'INR'
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'compactMode' in parsed &&
      'preferredCurrency' in parsed &&
      typeof parsed.compactMode === 'boolean' &&
      (parsed.preferredCurrency === 'INR' || parsed.preferredCurrency === 'USD')
    ) {
      return parsed as DashboardPreferences;
    }
  } catch {
    // Invalid or unavailable browser storage: use safe defaults.
  }

  return fallback;
}

export function savePreferences(value: DashboardPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage may be unavailable or full. The application should still work.
  }
}
```

Validate persisted data at runtime. Treat browser storage as untrusted input and never persist sensitive payment or authentication data.
