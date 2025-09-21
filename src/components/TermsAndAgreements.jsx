import React, { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "../main.jsx";
import { useOutletContext } from "react-router-dom";

export default function TermsAndAgreement() {
  const { darkMode } = useContext(AppContext);
  const { form, handleChange } = useOutletContext();

  const contentRef = useRef(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  // Scroll detection
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () =>
      setScrolledToBottom(
        el.scrollHeight - el.scrollTop - el.clientHeight <= 10
      );
    el.addEventListener("scroll", onScroll);
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Checklist state
  const [checks, setChecks] = useState({
    read: false,
    oneTime: false,
    noRefund: false,
    age: false,
    privacy: false,
  });

  const toggleCheck = (key) => setChecks((s) => ({ ...s, [key]: !s[key] }));
  const allChecked = Object.values(checks).every(Boolean);

  // Update form.termsAccepted only if value changes to avoid infinite loop
  useEffect(() => {
    const accepted = scrolledToBottom && allChecked;
    if (form.termsAccepted !== accepted) {
      handleChange("termsAccepted")({
        target: {
          name: "termsAccepted",
          type: "checkbox",
          checked: accepted,
        },
      });
    }
  }, [scrolledToBottom, allChecked, handleChange, form.termsAccepted]);

  const checklistItems = [
    { key: "read", label: "I have read the Terms & Agreement." },
    { key: "oneTime", label: "I understand this is a ONE-TIME PAYMENT." },
    { key: "noRefund", label: "I understand there is no refund." },
    { key: "age", label: "I am of legal age or have guardian consent." },
    {
      key: "privacy",
      label: "I consent to the processing of personal data.",
      full: true,
    },
  ];

  return (
    <div
      className={`relative min-h-[300px] w-[clamp(320px,90%,500px)] rounded-xl p-6 z-10 transition-all flex flex-col gap-4
        ${
          darkMode
            ? "bg-softblack text-white shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a]"
            : "bg-mustard-light text-softblack shadow-blk"
        }`}
    >
      <h3 className="font-semibold text-lg mb-2">Terms & Agreements</h3>
      <p className="text-sm opacity-80 mb-2">
        Please read carefully before proceeding.
      </p>

      {/* Scrollable content */}
      <div
        ref={contentRef}
        className="px-2 py-2 overflow-auto text-sm space-y-4 flex-1 border rounded-lg"
        style={{ maxHeight: "55vh" }}
      >
        <section>
          <h4 className="font-semibold mb-1">1. Subscription & Payment</h4>
          <p>By purchasing access you agree to a ONE-TIME PAYMENT.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">2. Refunds & Cancellation</h4>
          <p>No refund policy applies.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">3. Access & Use</h4>
          <p>After purchase you will receive access to the service.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">4. Warranties & Liability</h4>
          <p>The service is provided "as is" without warranties.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">5. Privacy & Data</h4>
          <p>
            Your personal data will be processed according to privacy rules.
          </p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">6. Eligibility</h4>
          <p>You must be of legal age or have guardian consent.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">7. Intellectual Property</h4>
          <p>
            All content, trademarks, and IP remain the property of the owner.
          </p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">8. Termination</h4>
          <p>The owner may suspend or terminate access at any time.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">9. Dispute Resolution</h4>
          <p>These terms are governed by the applicable laws specified.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">10. Contact & Support</h4>
          <p>For support, contact the owner via the website.</p>
        </section>
        <section>
          <h4 className="font-semibold mb-1">11. Additional Provisions</h4>
          <p>This agreement may include additional specific product terms.</p>
          <p className="italic text-sm opacity-80">
            By scrolling to the bottom and checking the boxes you acknowledge
            and accept these terms.
          </p>
        </section>
      </div>

      {/* Scroll/Checklist status */}
      <div className="text-xs opacity-80">
        {scrolledToBottom
          ? "You have reached the end of the agreement."
          : "Please scroll to the bottom to enable acceptance."}
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {checklistItems.map(({ key, label, full }) => (
          <label
            key={key}
            className={`flex items-center gap-2 ${full ? "col-span-full" : ""}`}
          >
            <input
              type="checkbox"
              checked={checks[key]}
              onChange={() => toggleCheck(key)}
              className="w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] accent-mustard-light"
            />
            <span className="leading-tight">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
