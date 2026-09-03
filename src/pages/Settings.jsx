import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  ShieldCheck,
  Bell,
  Database,
  Globe,
  Lock,
  Save,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";

// =========================================================
// SETTINGS PAGE
// =========================================================
// IMPORTANT:
// This is frontend-only configuration UI.
//
// Production settings must be:
// - validated server-side
// - protected with authentication
// - controlled through role-based permissions
// - stored securely
// - audited
//
// Never trust frontend settings for security enforcement.
// =========================================================

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    organizationName: "Nirmansetu",
    municipality: "Kathmandu Metropolitan City",
    timezone: "Asia/Kathmandu",
    language: "English",
    emailNotifications: true,
    projectAlerts: true,
    verificationAlerts: true,
    aiAlerts: true,
    weeklyReports: false,
    twoFactorAuthentication: true,
    sessionTimeout: "30",
  });

  const [showSessionInfo, setShowSessionInfo] = useState(false);

  // =======================================================
  // UPDATE SETTING
  // =======================================================

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  // =======================================================
  // SAVE SETTINGS
  // =======================================================

  const handleSave = () => {
    // Frontend development only.
    //
    // Production:
    // Send validated settings to authenticated backend API.

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // =======================================================
  // SIDEBAR SECTIONS
  // =======================================================

  const sections = [
    {
      id: "general",
      label: "General",
      description: "Application configuration",
      icon: SettingsIcon,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Alerts and reporting",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      description: "Access and protection",
      icon: ShieldCheck,
    },
    {
      id: "system",
      label: "System",
      description: "Platform information",
      icon: Database,
    },
  ];

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 md:p-6 lg:p-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-600 sm:text-sm">
            Administration
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Manage application preferences, notifications,
            security configuration, and system information.
          </p>
        </section>

        {/* =================================================
            SAVE SUCCESS MESSAGE
        ================================================= */}

        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2
              size={18}
              className="shrink-0 text-emerald-600"
            />

            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Settings saved
              </p>

              <p className="mt-1 text-xs text-emerald-700">
                Your settings have been updated successfully.
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            SETTINGS LAYOUT
        ================================================= */}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* =================================================
              SETTINGS NAVIGATION
          ================================================= */}

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">

            {sections.map((section) => {
              const Icon = section.icon;

              const isActive =
                activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                  className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition last:mb-0 ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-blue-600"
                        : "text-slate-400"
                    }
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {section.label}
                    </p>

                    <p
                      className={`mt-0.5 text-[11px] ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400"
                      }`}
                    >
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* =================================================
              SETTINGS CONTENT
          ================================================= */}

          <div className="min-w-0">

            {/* =================================================
                GENERAL
            ================================================= */}

            {activeSection === "general" && (
              <div className="space-y-6">

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                        <SettingsIcon size={19} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                          General Settings
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Configure basic application information.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="space-y-5 p-5 sm:p-6">

                    {/* Organization */}

                    <div>
                      <label
                        htmlFor="organizationName"
                        className="text-xs font-semibold text-slate-700"
                      >
                        Organization Name
                      </label>

                      <input
                        id="organizationName"
                        type="text"
                        value={settings.organizationName}
                        onChange={(event) =>
                          updateSetting(
                            "organizationName",
                            event.target.value
                          )
                        }
                        className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Municipality */}

                    <div>
                      <label
                        htmlFor="municipality"
                        className="text-xs font-semibold text-slate-700"
                      >
                        Municipality / Government Office
                      </label>

                      <input
                        id="municipality"
                        type="text"
                        value={settings.municipality}
                        onChange={(event) =>
                          updateSetting(
                            "municipality",
                            event.target.value
                          )
                        }
                        className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Timezone + Language */}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                      <div>
                        <label
                          htmlFor="timezone"
                          className="text-xs font-semibold text-slate-700"
                        >
                          Timezone
                        </label>

                        <select
                          id="timezone"
                          value={settings.timezone}
                          onChange={(event) =>
                            updateSetting(
                              "timezone",
                              event.target.value
                            )
                          }
                          className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="Asia/Kathmandu">
                            Asia/Kathmandu
                          </option>

                          <option value="UTC">
                            UTC
                          </option>

                          <option value="Asia/Kolkata">
                            Asia/Kolkata
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="language"
                          className="text-xs font-semibold text-slate-700"
                        >
                          Language
                        </label>

                        <select
                          id="language"
                          value={settings.language}
                          onChange={(event) =>
                            updateSetting(
                              "language",
                              event.target.value
                            )
                          }
                          className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="English">
                            English
                          </option>

                          <option value="Nepali">
                            Nepali
                          </option>
                        </select>
                      </div>

                    </div>

                  </div>
                </section>

              </div>
            )}

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            {activeSection === "notifications" && (
              <div className="space-y-6">

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                        <Bell size={19} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                          Notification Preferences
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Choose which administrative events should
                          generate notifications.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">

                    <ToggleSetting
                      label="Email Notifications"
                      description="Receive important administrative notifications."
                      enabled={settings.emailNotifications}
                      onChange={(value) =>
                        updateSetting(
                          "emailNotifications",
                          value
                        )
                      }
                    />

                    <ToggleSetting
                      label="Project Alerts"
                      description="Receive alerts when project status changes or requires attention."
                      enabled={settings.projectAlerts}
                      onChange={(value) =>
                        updateSetting(
                          "projectAlerts",
                          value
                        )
                      }
                    />

                    <ToggleSetting
                      label="Verification Alerts"
                      description="Receive notifications about verification activities."
                      enabled={settings.verificationAlerts}
                      onChange={(value) =>
                        updateSetting(
                          "verificationAlerts",
                          value
                        )
                      }
                    />

                    <ToggleSetting
                      label="AI Monitoring Alerts"
                      description="Receive alerts generated by project monitoring systems."
                      enabled={settings.aiAlerts}
                      onChange={(value) =>
                        updateSetting(
                          "aiAlerts",
                          value
                        )
                      }
                    />

                    <ToggleSetting
                      label="Weekly Reports"
                      description="Receive a scheduled weekly infrastructure report."
                      enabled={settings.weeklyReports}
                      onChange={(value) =>
                        updateSetting(
                          "weeklyReports",
                          value
                        )
                      }
                    />

                  </div>
                </section>

              </div>
            )}

            {/* =================================================
                SECURITY
            ================================================= */}

            {activeSection === "security" && (
              <div className="space-y-6">

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600">
                        <ShieldCheck size={19} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                          Security Settings
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Configure security-related preferences.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">

                    <ToggleSetting
                      label="Two-Factor Authentication"
                      description="Require an additional authentication factor for supported accounts."
                      enabled={settings.twoFactorAuthentication}
                      onChange={(value) =>
                        updateSetting(
                          "twoFactorAuthentication",
                          value
                        )
                      }
                    />

                    <div className="p-5 sm:p-6">

                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Session Timeout
                          </p>

                          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                            Configure the preferred inactivity timeout
                            for administrative sessions.
                          </p>
                        </div>

                        <Lock
                          size={18}
                          className="shrink-0 text-slate-400"
                        />

                      </div>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                        <select
                          value={settings.sessionTimeout}
                          onChange={(event) =>
                            updateSetting(
                              "sessionTimeout",
                              event.target.value
                            )
                          }
                          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="15">
                            15 minutes
                          </option>

                          <option value="30">
                            30 minutes
                          </option>

                          <option value="60">
                            60 minutes
                          </option>

                          <option value="120">
                            120 minutes
                          </option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            setShowSessionInfo(
                              !showSessionInfo
                            )
                          }
                          className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          {showSessionInfo ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}

                          Security information
                        </button>

                      </div>

                      {showSessionInfo && (
                        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4">

                          <p className="text-xs font-semibold text-blue-900">
                            Production security
                          </p>

                          <p className="mt-1 text-xs leading-5 text-blue-700">
                            Session expiration, token invalidation,
                            password policies, MFA enforcement, and
                            authorization must be enforced by the
                            backend. Frontend settings cannot provide
                            security by themselves.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>
                </section>

                {/* Security warning */}

                <section className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">

                  <AlertTriangle
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <div>

                    <p className="text-xs font-semibold text-amber-900 sm:text-sm">
                      Administrative security notice
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-700">
                      These controls are currently frontend
                      development settings. Production security
                      controls must be enforced server-side and
                      recorded in audit logs.
                    </p>

                  </div>

                </section>

              </div>
            )}

            {/* =================================================
                SYSTEM
            ================================================= */}

            {activeSection === "system" && (
              <div className="space-y-6">

                <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
                        <Database size={19} />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                          System Information
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Information about the current application
                          environment.
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">

                    <SystemInfo
                      label="Application"
                      value="Nirmansetu"
                      icon={SettingsIcon}
                    />

                    <SystemInfo
                      label="Environment"
                      value="Development"
                      icon={Globe}
                    />

                    <SystemInfo
                      label="Frontend"
                      value="React"
                      icon={Globe}
                    />

                    <SystemInfo
                      label="Data Source"
                      value="Mock Development Data"
                      icon={Database}
                    />

                    <SystemInfo
                      label="Security Status"
                      value="Backend Pending"
                      icon={ShieldCheck}
                    />

                    <SystemInfo
                      label="Version"
                      value="0.1.0"
                      icon={SettingsIcon}
                    />

                  </div>

                </section>

                {/* Architecture note */}

                <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                  <div className="flex items-start gap-3">

                    <Database
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>

                      <p className="text-xs font-semibold text-blue-900 sm:text-sm">
                        Production architecture
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        The current frontend is designed to consume
                        authenticated backend APIs. Database access,
                        authorization, audit logs, report generation,
                        AI processing, and sensitive configuration
                        will be handled by the backend.
                      </p>

                    </div>

                  </div>

                </section>

              </div>
            )}

            {/* =================================================
                SAVE BUTTON
            ================================================= */}

            <div className="mt-6 flex justify-end">

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <Save size={15} />
                Save Settings
              </button>

            </div>

          </div>
        </section>

        {/* =================================================
            SECURITY / DATA NOTE
        ================================================= */}

        <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mt-8">

          <Lock
            size={18}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>

            <p className="text-xs font-semibold text-blue-900 sm:text-sm">
              Secure Configuration
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Settings displayed here are currently local frontend
              development state. In production, configuration changes
              must require authenticated administrative access,
              server-side validation, role-based authorization, secure
              storage, and audit logging.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}

// =========================================================
// TOGGLE SETTING COMPONENT
// =========================================================

function ToggleSetting({
  label,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 sm:p-6">

      <div className="min-w-0">

        <p className="text-sm font-semibold text-slate-800">
          {label}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}

// =========================================================
// SYSTEM INFORMATION COMPONENT
// =========================================================

function SystemInfo({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className="text-slate-400"
        />

        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
}