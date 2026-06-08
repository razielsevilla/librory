import { useState } from 'react';
import { useLibraryStore } from '../store/library';
import { PillSwitch } from '../components/PillSwitch';
import { format } from 'date-fns';

export default function SettingsScreen() {
  const settings = useLibraryStore(state => state.settings);
  const updateSettings = useLibraryStore(state => state.updateSettings);
  const [syncing, setSyncing] = useState(false);

  if (!settings) return null;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      updateSettings({ lastSyncAt: Date.now() });
      setSyncing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full pt-safe animate-in fade-in duration-500 overflow-y-auto cozy-scroll">
      <div className="p-6 pb-24 max-w-2xl mx-auto w-full">
        <span className="eyebrow mb-2 mt-8">Configuration</span>
        <h1 className="font-serif-display text-4xl text-[var(--ink)] mb-12">
          Sanctuary Settings
        </h1>

        <div className="flex flex-col gap-12">
          <section>
            <h3 className="font-serif italic text-xl text-[var(--ink)] mb-6 border-b border-[var(--border)] pb-2">
              Reading Environment
            </h3>
            
            <div className="flex flex-col gap-4">
              <PillSwitch 
                label="Atmospheric Noise" 
                checked={settings.atmosphericNoise} 
                onChange={(c) => updateSettings({ atmosphericNoise: c })} 
              />
              <PillSwitch 
                label="Quiet Hours (Dim UI at night)" 
                checked={settings.quietHours} 
                onChange={(c) => updateSettings({ quietHours: c })} 
              />
              <PillSwitch 
                label="Soft Pulses (Animations)" 
                checked={settings.softPulses} 
                onChange={(c) => updateSettings({ softPulses: c })} 
              />
            </div>
          </section>

          <section>
            <h3 className="font-serif italic text-xl text-[var(--ink)] mb-6 border-b border-[var(--border)] pb-2">
              Local & Private Journal
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="text-sm font-sans text-[var(--muted)]">
                <span className="block text-[var(--ink)] mb-1">Local Storage Path:</span>
                <code className="bg-[var(--surface-sunken)] px-3 py-2 rounded-md border border-[var(--border)] block overflow-x-auto text-xs">
                  indexedDB://librory_v1
                </code>
              </div>

              <div className="flex flex-col gap-2">
                <PillSwitch 
                  label="Secure Cloud Backup" 
                  checked={settings.secureCloudBackup} 
                  onChange={(c) => updateSettings({ secureCloudBackup: c })} 
                />
                
                {settings.secureCloudBackup && (
                  <div className="bg-[var(--surface-sunken)] p-4 rounded-lg border border-[var(--border)] flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                      <span className="font-sans text-[0.65rem] uppercase tracking-widest text-[var(--muted)] mb-1">Status</span>
                      <span className="font-serif text-sm text-[var(--ink)]">
                        {settings.lastSyncAt ? `Last synced ${format(settings.lastSyncAt, 'MMM d, h:mm a')}` : 'Never synced'}
                      </span>
                    </div>
                    <button 
                      onClick={handleSync}
                      disabled={syncing}
                      className="px-4 py-2 rounded-full border border-[var(--border)] text-xs uppercase tracking-widest font-sans transition-colors hover:bg-[var(--ink)] hover:text-[var(--page)] hover:border-[var(--ink)] disabled:opacity-50 text-[var(--ink)]"
                    >
                      {syncing ? 'Syncing...' : 'Sync Now'}
                    </button>
                  </div>
                )}
                <p className="text-xs font-serif italic text-[var(--muted)] mt-2">
                  * Note: iCloud/Drive sync is a v2 feature. Toggling this currently uses local preferences.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
