import React from "react";

export default function NotificationsSection({ notifications, onChange }) {
  return (
    <div className="mt-10 space-y-10">
      <fieldset>
        <legend className="text-sm font-semibold text-gray-900">By Email</legend>
        <div className="mt-6 space-y-6">
          {["comments", "candidates", "offers"].map((key) => (
            <div key={key} className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id={key}
                  name={`notifications.${key}`}
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={onChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor={key} className="font-medium text-gray-900 capitalize">
                  {key}
                </label>
                <p className="text-gray-500">
                  {key === "comments" && "Get notified when someone posts a comment on a posting."}
                  {key === "candidates" && "Get notified when a candidate applies for a job."}
                  {key === "offers" && "Get notified when a candidate accepts or rejects an offer."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-gray-900">Push notifications</legend>
        <p className="mt-1 text-sm text-gray-600">
          These are delivered via SMS to your mobile phone.
        </p>
        <div className="mt-6 space-y-6">
          {["EVERYTHING", "SAME_AS_EMAIL", "NO_NOTIFICATION"].map((option) => (
            <div key={option} className="flex items-center gap-x-3">
              <input
                id={option}
                name="notifications.pushNotification"
                type="radio"
                value={option}
                checked={notifications.pushNotification === option}
                onChange={onChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor={option} className="block text-sm font-medium text-gray-900">
                {option.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
