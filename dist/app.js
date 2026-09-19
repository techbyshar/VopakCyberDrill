"use strict";

const categories = [
  { id: "detection", label: "Detection and assessment" },
  { id: "escalation", label: "Escalation and authority" },
  { id: "operations", label: "Safe operations" },
  { id: "reporting", label: "Reporting and records" },
  { id: "recovery", label: "Recovery and improvement" }
];

const remoteAccessStages = [
  {
    id: "briefing",
    nav: "Briefing",
    time: 10,
    title: "Terminal operations are beginning",
    summary: "It is 07:20 on a weekday. A vessel transfer is planned later this morning. A contractor is scheduled to support routine terminal equipment maintenance. Nothing has been declared an incident.",
    facilitator: "Assign the participant roles. Confirm the field mission role player and remind everyone that all notifications and operational actions are simulated.",
    evidence: [
      { label: "Operations", value: "Routine terminal activity", detail: "A vessel movement and product transfer are on the schedule." },
      { label: "Maintenance", value: "Third party support expected", detail: "A contractor may need approved remote access." },
      { label: "Participants", value: "Cross functional response", detail: "Operations, IT, OT, Security, and terminal leadership should be represented." },
      { label: "Objective", value: "Test the response process", detail: "Focus on decisions, communication, records, and corrective actions." }
    ]
  },
  {
    id: "assess",
    nav: "Assess",
    time: 15,
    title: "A routine email does not look quite right",
    summary: "A scheduler receives an urgent message that appears to come from the maintenance contractor. The message says a revised remote access package must be opened before the technician can begin work.",
    prompt: "What should your team do first?",
    facilitator: "Give teams time to inspect the message. Ask how Vopak employees report suspected phishing, then test when a Hoxhunt report must be followed by immediate IT or OT escalation.",
    email: true,
    choices: [
      {
        id: "a1",
        text: "Stop interacting with the message and use the Hoxhunt button to report it to the Vopak SOC. If anyone interacted with it or sees system or operational symptoms, also contact local IT or the OT focal point immediately.",
        scores: { detection: 4, escalation: 3, operations: 2, reporting: 4, recovery: 1 }
      },
      {
        id: "a2",
        text: "Use the Hoxhunt button and take no further action, even if the attachment was opened or the workstation begins behaving unusually.",
        scores: { detection: 3, escalation: 0, operations: 0, reporting: 2, recovery: 0 }
      },
      {
        id: "a3",
        text: "Open the package in a browser so the team can see whether it contains the expected maintenance information.",
        scores: { detection: 0, escalation: 0, operations: 0, reporting: 0, recovery: 0 }
      },
      {
        id: "a4",
        text: "Wait for more reports because one unusual email does not establish a cyber incident.",
        scores: { detection: 1, escalation: 0, operations: 1, reporting: 0, recovery: 0 }
      }
    ],
    guide: "For a suspected Vopak phishing email, the employee uses the Hoxhunt button. This sends the potentially dangerous message to the Vopak SOC for analysis. Hoxhunt is the email reporting path, but it is not the complete response when someone clicked, opened a file, entered credentials, sees device or account anomalies, or suspects IT or OT impact. In those cases, the employee also contacts local IT or the OT focal point immediately so the ABC incident response process can begin. Do not delete, forward, reply to, or continue interacting with the message.",
    citations: [
      { label: "Vopak Hoxhunt phishing reporting process", source: "hoxhunt" },
      { label: "Vopak GIT CIS Guideline, Appendix A", source: "irbc" },
      { label: "33 CFR 101.650", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.650" }
    ]
  },
  {
    id: "escalate",
    nav: "Escalate",
    time: 18,
    title: "The signal has reached the terminal environment",
    summary: "Local triage finds a remote access session using the contractor account outside the approved work window. An operations workstation is unusually slow. A second user reports that a shared folder briefly displayed unreadable filenames.",
    prompt: "What coordinated action should happen now?",
    facilitator: "Release the field mission. Listen for safe isolation, GLAS escalation, local management notification, and evidence preservation. End users should not improvise isolation of critical OT equipment.",
    mission: true,
    evidence: [
      { label: "Remote access", value: "Session outside approved window", detail: "The contractor has not confirmed the session." },
      { label: "IT signal", value: "Workstation performance anomaly", detail: "The workstation supports terminal coordination." },
      { label: "File signal", value: "Unexpected filename changes", detail: "The event may indicate encryption or tampering." },
      { label: "Confidence", value: "Credible cyberattack suspected", detail: "The full scope remains unknown." }
    ],
    choices: [
      {
        id: "e1",
        text: "Have local IT or OT isolate the approved connection safely, call the GLAS emergency number, inform local management, and preserve system state and timestamps.",
        scores: { detection: 3, escalation: 4, operations: 3, reporting: 2, recovery: 2 }
      },
      {
        id: "e2",
        text: "Power off every affected device immediately, then open a normal support ticket when the environment is stable.",
        scores: { detection: 2, escalation: 1, operations: 1, reporting: 1, recovery: 0 }
      },
      {
        id: "e3",
        text: "Let the contractor disconnect the session and continue maintenance while IT investigates the shared folder.",
        scores: { detection: 1, escalation: 0, operations: 0, reporting: 0, recovery: 0 }
      },
      {
        id: "e4",
        text: "Ask each department to investigate separately and reconvene after the vessel transfer.",
        scores: { detection: 1, escalation: 1, operations: 1, reporting: 0, recovery: 0 }
      }
    ],
    guide: "For a credible cyberattack, the internal guidance calls for safe isolation by qualified IT or OT personnel, immediate escalation for a critical event, and local management involvement. Preserve volatile evidence by avoiding an unnecessary restart or power off. The CySO retains responsibility even when duties are assigned.",
    citations: [
      { label: "Vopak GIT CIS Guideline, Appendix A", source: "irbc" },
      { label: "33 CFR 101.625", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.625" }
    ]
  },
  {
    id: "continue",
    nav: "Continue",
    time: 18,
    title: "Operations can continue only with trusted information",
    summary: "The control room reports a mismatch between a tank level shown on one workstation and the independent field reading. No release has occurred. The berth window is approaching and the customer asks whether the transfer will begin on time.",
    prompt: "How should the terminal manage the operational decision?",
    facilitator: "Ask who owns the decision to pause or continue operations. Look for independent verification, activation of the local emergency or continuity process, and disciplined communication with the vessel and customer.",
    evidence: [
      { label: "Safety", value: "No release or injury", detail: "A trusted measurement discrepancy exists." },
      { label: "Availability", value: "Transfer window approaching", detail: "A delay may affect the customer and berth schedule." },
      { label: "Integrity", value: "One display cannot be trusted", detail: "Independent field verification is available." },
      { label: "Authority", value: "Terminal leadership required", detail: "This is an operational continuity decision." }
    ],
    choices: [
      {
        id: "c1",
        text: "Pause the affected activity safely, activate the local response and continuity process, use approved independent verification, and let terminal leadership decide when operations can resume.",
        scores: { detection: 3, escalation: 3, operations: 4, reporting: 2, recovery: 3 }
      },
      {
        id: "c2",
        text: "Continue the transfer using the independent field reading while IT investigates the workstation.",
        scores: { detection: 2, escalation: 1, operations: 1, reporting: 1, recovery: 1 }
      },
      {
        id: "c3",
        text: "Stop every terminal operation until every IT and OT asset has been checked and rebuilt.",
        scores: { detection: 2, escalation: 2, operations: 2, reporting: 1, recovery: 1 }
      },
      {
        id: "c4",
        text: "Let the control room make the decision alone because it owns the affected process.",
        scores: { detection: 1, escalation: 0, operations: 1, reporting: 0, recovery: 0 }
      }
    ],
    guide: "The Terminal Manager or Site Director leads crisis management and business continuity decisions. Safety remains the priority. The response should protect trusted operations, use approved manual or alternate processes where available, and maintain communication with affected parties.",
    citations: [
      { label: "Vopak GIT CIS Guideline, Continue the Operation", source: "irbc" },
      { label: "Vopak OT Security Policy, section 5.2", source: "otpolicy" },
      { label: "33 CFR 101.645", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.645" }
    ]
  },
  {
    id: "report",
    nav: "Report",
    time: 17,
    title: "The event now meets a regulatory threshold",
    summary: "Corporate responders confirm unauthorized access through a third party account and potential impact to a covered OT environment. The operational disruption may affect the terminal’s ability to deliver services. The investigation is still developing.",
    prompt: "Which reporting approach should the response team initiate?",
    facilitator: "This is a simulated reporting decision. Nobody should contact an authority. Ask who has authority, what must be reported immediately, what is still unknown, and how internal records continue in parallel.",
    evidence: [
      { label: "Access", value: "Unauthorized third party session", detail: "The account and connection are confirmed." },
      { label: "Impact", value: "Operational disruption possible", detail: "A critical transfer remains paused." },
      { label: "Scope", value: "Covered OT environment involved", detail: "The final impact is not yet known." },
      { label: "Threshold", value: "Reportable cyber incident", detail: "The event can reasonably lead to substantial operational impact." }
    ],
    choices: [
      {
        id: "r1",
        text: "Follow the approved facility procedure for immediate reporting to the FBI, CISA, and Captain of the Port or their representatives, while internal escalation and records continue.",
        scores: { detection: 3, escalation: 4, operations: 2, reporting: 4, recovery: 2 }
      },
      {
        id: "r2",
        text: "Report only to the National Response Center because it automatically completes every other federal notification.",
        scores: { detection: 2, escalation: 2, operations: 1, reporting: 1, recovery: 1 }
      },
      {
        id: "r3",
        text: "Wait until forensic analysis confirms the root cause and exact impact before making an external report.",
        scores: { detection: 2, escalation: 1, operations: 1, reporting: 0, recovery: 1 }
      },
      {
        id: "r4",
        text: "Send a detailed technical email to CISA and treat that as the complete reporting process.",
        scores: { detection: 2, escalation: 1, operations: 1, reporting: 1, recovery: 1 }
      }
    ],
    guide: "For an MTSA waterfront facility subject to 33 CFR 6.16-1, an actual or threatened cyber incident involving or endangering the facility must be reported immediately to the FBI, CISA, and the Captain of the Port or their representatives. The exact approved facility procedure controls. Internal escalation and incident records continue in parallel.",
    citations: [
      { label: "33 CFR 6.16-1", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-A/part-6/subpart-6.16/section-6.16-1" },
      { label: "33 CFR 101.650", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.650" },
      { label: "Vopak Incident Classification Standard, section 7.1", source: "classification" }
    ]
  },
  {
    id: "recover",
    nav: "Recover",
    time: 15,
    title: "Containment is holding, but recovery can create new risk",
    summary: "The unauthorized connection has been disabled. No evidence of product loss or environmental impact has been found. A known good backup is available, but the affected workstation and vendor account have not completed validation.",
    prompt: "What recovery approach should the team approve?",
    facilitator: "Look for protected backups, validation before reconnecting, phased restoration, monitoring, records, and corrective actions. Ask what evidence would support a safe return to service.",
    evidence: [
      { label: "Containment", value: "Unauthorized access disabled", detail: "Monitoring continues for related activity." },
      { label: "Backup", value: "Known good copy available", detail: "Restore testing is required before use." },
      { label: "Access", value: "Vendor account under review", detail: "Credentials and remote access approval need validation." },
      { label: "Operations", value: "Independent checks remain available", detail: "A phased return is possible." }
    ],
    choices: [
      {
        id: "v1",
        text: "Validate containment and backups, preserve logs, approve a phased restoration with IT and OT monitoring, and record corrective actions before closing the incident.",
        scores: { detection: 3, escalation: 3, operations: 4, reporting: 3, recovery: 4 }
      },
      {
        id: "v2",
        text: "Restore the workstation from backup immediately so operations can recover the berth window.",
        scores: { detection: 1, escalation: 1, operations: 1, reporting: 1, recovery: 1 }
      },
      {
        id: "v3",
        text: "Replace the affected workstation and close the incident because no physical impact occurred.",
        scores: { detection: 1, escalation: 1, operations: 2, reporting: 0, recovery: 1 }
      },
      {
        id: "v4",
        text: "Keep all systems offline until an external investigator provides written clearance.",
        scores: { detection: 2, escalation: 2, operations: 1, reporting: 2, recovery: 2 }
      }
    ],
    guide: "Recovery should be controlled and evidence based. The Coast Guard rule requires protected and frequently tested backups for critical IT and OT systems. Vopak guidance calls for containment, eradication, restoration, business continuity, and documented lessons and actions.",
    citations: [
      { label: "33 CFR 101.650", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.650" },
      { label: "Vopak GIT CIS Guideline, Continue the Operation", source: "irbc" },
      { label: "Vopak OT Security Policy, backup and incident management", source: "otpolicy" }
    ]
  },
  {
    id: "debrief",
    nav: "Debrief",
    time: 12,
    title: "The response is only complete when the organization learns",
    summary: "The terminal has moved into a controlled recovery. The final task is to identify the gaps that made the response slower, less clear, or more dependent on individual knowledge than it should be.",
    prompt: "What is the most important improvement your team would make before the next incident?",
    facilitator: "Ask each team for one strength, one response gap, and one corrective action with an owner. Then complete the after action review.",
    reflection: true,
    guide: "The exercise record should capture participation, decisions, communication steps, deficiencies, and corrective actions. Coast Guard exercises test the full program and require identified corrective actions to be addressed and documented as soon as possible.",
    citations: [
      { label: "33 CFR 101.635", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.635" },
      { label: "33 CFR 101.640", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.640" }
    ]
  }
];

function buildScenarioStages(overrides) {
  return remoteAccessStages.map(stage => ({ ...stage, ...(overrides[stage.id] || {}) }));
}

const ransomwareStages = buildScenarioStages({
  briefing: {
    title: "The early shift depends on shared operations files",
    summary: "It is 06:45 on a weekday. Operations teams are using shared planning files, transfer documents, and shift records before a scheduled vessel movement. No cyber incident has been declared.",
    evidence: [
      { label: "Operations", value: "Vessel movement scheduled", detail: "Transfer planning and shift coordination are underway." },
      { label: "Information", value: "Shared files in active use", detail: "Multiple terminal functions depend on current documents." },
      { label: "Participants", value: "Cross functional response", detail: "Operations, IT, OT, Security, and terminal leadership should be represented." },
      { label: "Objective", value: "Test ransomware readiness", detail: "Focus on safe containment, continuity, reporting, and recovery." }
    ]
  },
  assess: {
    email: false,
    title: "Shared files begin changing without explanation",
    summary: "A planner reports that filenames in a shared folder are changing and documents will not open. A message demanding payment appears on the workstation. Another employee says the folder worked ten minutes ago.",
    prompt: "What should your team do first?",
    facilitator: "Ask how the employee reports the event and what actions they must avoid. Look for immediate local IT or OT escalation, safe preservation of system state, and critical incident escalation rather than treating this as an ordinary service ticket.",
    evidence: [
      { label: "File access", value: "Documents will not open", detail: "The problem was first noticed in an active shared folder." },
      { label: "File names", value: "Unexpected extensions appearing", detail: "The changes are continuing while the team observes." },
      { label: "Workstation", value: "Payment demand displayed", detail: "The message claims files have been encrypted." },
      { label: "Scope", value: "Not yet established", detail: "IT and OT impact is still unknown." }
    ],
    choices: [
      { id: "a1", text: "Stop using the affected workstation and shared folder, contact local IT or the OT focal point immediately, escalate the credible attack through the critical incident path, and preserve system state.", scores: { detection: 4, escalation: 4, operations: 3, reporting: 3, recovery: 2 } },
      { id: "a2", text: "Power off the workstation and delete the payment message before calling the normal service desk.", scores: { detection: 2, escalation: 1, operations: 1, reporting: 0, recovery: 0 } },
      { id: "a3", text: "Try several more shared files to determine whether the encryption is widespread.", scores: { detection: 1, escalation: 0, operations: 0, reporting: 0, recovery: 0 } },
      { id: "a4", text: "Wait for a second workstation to show the same behavior before declaring an incident.", scores: { detection: 1, escalation: 0, operations: 1, reporting: 0, recovery: 0 } }
    ],
    guide: "Unexpected encryption, inaccessible files, and a payment demand are credible indicators of a cyberattack. Contact local IT or the OT focal point immediately and use the critical escalation path. Qualified responders should contain the event while preserving logs and volatile evidence. End users should not restart, power off, or explore additional files unless instructed.",
    citations: [
      { label: "Vopak GIT CIS Guideline, Appendix A", source: "irbc" },
      { label: "Vopak OT Security Policy, section 5.2", source: "otpolicy" },
      { label: "33 CFR 101.650", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.650" }
    ]
  },
  escalate: {
    title: "The encryption activity is spreading",
    summary: "A second workstation now shows encrypted files. The affected network supports terminal coordination, but no direct OT compromise has been confirmed. A recent privileged login appears in the available records.",
    facilitator: "Release the field mission. Listen for qualified isolation, immediate GLAS escalation, local management notification, protection of backups, and evidence preservation.",
    evidence: [
      { label: "Spread", value: "Second workstation affected", detail: "The event is no longer limited to one user." },
      { label: "OT status", value: "No compromise confirmed", detail: "Absence of evidence is not evidence of safety." },
      { label: "Access", value: "Privileged login observed", detail: "The purpose and owner are not yet verified." },
      { label: "Backups", value: "Status unknown", detail: "Protection and validation must begin now." }
    ],
    choices: [
      { id: "e1", text: "Have qualified IT or OT personnel isolate the affected path safely, call the GLAS emergency number, inform local management, protect backups, and preserve system state and timestamps.", scores: { detection: 3, escalation: 4, operations: 3, reporting: 2, recovery: 3 } },
      { id: "e2", text: "Power off every workstation and server that can access the shared folder before notifying the response team.", scores: { detection: 2, escalation: 1, operations: 1, reporting: 1, recovery: 0 } },
      { id: "e3", text: "Restore the shared folder immediately and investigate the privileged login after operations resume.", scores: { detection: 1, escalation: 0, operations: 0, reporting: 0, recovery: 0 } },
      { id: "e4", text: "Ask each department to investigate its own files and reconvene after the vessel movement.", scores: { detection: 1, escalation: 1, operations: 1, reporting: 0, recovery: 0 } }
    ]
  },
  continue: {
    title: "Operations need records that can be trusted",
    summary: "Transfer documents and scheduling files are unavailable. Independent field controls remain functional, but the team cannot confirm that the latest planning data is complete and accurate. The vessel is approaching its berth window.",
    facilitator: "Ask who owns the decision to pause or continue. Look for approved business continuity methods, trusted independent verification, and clear communication with the vessel and customer.",
    evidence: [
      { label: "Safety controls", value: "Independent controls available", detail: "Their integrity must still be verified." },
      { label: "Records", value: "Current documents unavailable", detail: "Required planning information may be incomplete." },
      { label: "Schedule", value: "Berth window approaching", detail: "Delay will have business consequences." },
      { label: "Authority", value: "Terminal leadership required", detail: "This is an operational continuity decision." }
    ],
    choices: [
      { id: "c1", text: "Pause the affected activity safely, activate the approved continuity process, verify required information through trusted sources, and let terminal leadership decide when operations can resume.", scores: { detection: 3, escalation: 3, operations: 4, reporting: 2, recovery: 3 } },
      { id: "c2", text: "Begin the transfer using the most recent printed documents while IT restores the shared folder.", scores: { detection: 2, escalation: 1, operations: 1, reporting: 1, recovery: 1 } },
      { id: "c3", text: "Stop every terminal operation until every corporate system has been rebuilt.", scores: { detection: 2, escalation: 2, operations: 2, reporting: 1, recovery: 1 } },
      { id: "c4", text: "Let the operations shift decide alone because the unavailable files belong to its process.", scores: { detection: 1, escalation: 0, operations: 1, reporting: 0, recovery: 0 } }
    ]
  },
  report: {
    title: "The disruption may meet a regulatory threshold",
    summary: "Corporate responders confirm ransomware affecting systems used to coordinate terminal operations. The disruption may materially affect the facility’s ability to deliver services, while the investigation into OT access remains active.",
    evidence: [
      { label: "Incident", value: "Ransomware confirmed", detail: "Multiple terminal workstations and files are affected." },
      { label: "Impact", value: "Operational disruption possible", detail: "A scheduled transfer cannot proceed as planned." },
      { label: "Scope", value: "OT access under investigation", detail: "The final impact is not yet known." },
      { label: "Threshold", value: "Reportable cyber incident", detail: "The event can reasonably lead to substantial operational impact." }
    ]
  },
  recover: {
    title: "Clean backups exist, but restoration must be controlled",
    summary: "Containment appears to be holding. Protected backups are available, but the team has not confirmed the original access path or validated every account and system needed for restoration.",
    evidence: [
      { label: "Containment", value: "Spread appears stopped", detail: "Monitoring continues for related activity." },
      { label: "Backups", value: "Protected copy available", detail: "Integrity and restore testing are required." },
      { label: "Access", value: "Root cause not confirmed", detail: "Credentials and privileged access need validation." },
      { label: "Operations", value: "Phased restoration possible", detail: "Each dependency must be trusted before reconnection." }
    ],
    choices: [
      { id: "v1", text: "Validate containment and clean backups, preserve logs, reset affected access, restore in phases with IT and OT monitoring, and document corrective actions before closure.", scores: { detection: 3, escalation: 3, operations: 4, reporting: 3, recovery: 4 } },
      { id: "v2", text: "Restore all files from the newest backup immediately so the vessel schedule can recover.", scores: { detection: 1, escalation: 1, operations: 1, reporting: 1, recovery: 1 } },
      { id: "v3", text: "Replace the two affected workstations and close the incident because no direct OT impact was confirmed.", scores: { detection: 1, escalation: 1, operations: 2, reporting: 0, recovery: 1 } },
      { id: "v4", text: "Keep all systems offline until an external investigator provides written clearance.", scores: { detection: 2, escalation: 2, operations: 1, reporting: 2, recovery: 2 } }
    ]
  }
});

const dataIntegrityStages = buildScenarioStages({
  briefing: {
    title: "A vessel transfer is approaching",
    summary: "It is 09:10 on a weekday. A vessel transfer is scheduled to begin soon. Control room displays, field instruments, and approved planning records are being checked as part of routine preparation. No incident has been declared.",
    evidence: [
      { label: "Operations", value: "Transfer preparation underway", detail: "The berth and terminal teams are coordinating start conditions." },
      { label: "Measurements", value: "Multiple data sources available", detail: "Control room and independent field readings can be compared." },
      { label: "Participants", value: "Cross functional response", detail: "Operations, IT, OT, Security, and terminal leadership should be represented." },
      { label: "Objective", value: "Test data integrity response", detail: "Focus on trusted information, authority, reporting, and recovery." }
    ]
  },
  assess: {
    email: false,
    title: "Two trusted looking readings do not agree",
    summary: "During the pre transfer check, the tank level shown on a control room workstation differs from the approved independent field reading. A valve status also changes on screen without a corresponding field action.",
    prompt: "What should your team do first?",
    facilitator: "Test whether teams recognize integrity loss as a possible cyber event. Look for a safe operational pause, independent verification, and immediate notification to local IT or the OT focal point.",
    evidence: [
      { label: "Tank level", value: "Display and field reading differ", detail: "The variance exceeds the normal tolerance." },
      { label: "Valve status", value: "Unexpected screen change", detail: "No corresponding field action is recorded." },
      { label: "Safety", value: "No release or injury", detail: "A transfer has not yet begun." },
      { label: "Cause", value: "Unknown", detail: "Sensor failure, configuration error, and cyber activity remain possible." }
    ],
    choices: [
      { id: "a1", text: "Pause the affected preparation safely, verify conditions through approved independent methods, contact local IT or the OT focal point immediately, and preserve the observed data and timestamps.", scores: { detection: 4, escalation: 3, operations: 4, reporting: 3, recovery: 2 } },
      { id: "a2", text: "Use the field reading and begin the transfer while OT investigates the screen later.", scores: { detection: 2, escalation: 1, operations: 1, reporting: 0, recovery: 0 } },
      { id: "a3", text: "Restart the control room workstation to see whether the two values match afterward.", scores: { detection: 1, escalation: 0, operations: 0, reporting: 0, recovery: 0 } },
      { id: "a4", text: "Assume the sensor needs calibration because no other cyber warning has appeared.", scores: { detection: 0, escalation: 0, operations: 1, reporting: 0, recovery: 0 } }
    ],
    guide: "Loss of integrity can be a cyber incident even when systems remain available. Treat unexplained process data or status changes as a credible warning. Keep the operation in a safe state, use approved independent verification, notify local IT or the OT focal point, and preserve evidence rather than restarting equipment.",
    citations: [
      { label: "Vopak GIT CIS Guideline, Appendix A", source: "irbc" },
      { label: "Vopak OT Security Policy, section 5.2", source: "otpolicy" },
      { label: "33 CFR 101.650", url: "https://www.ecfr.gov/current/title-33/chapter-I/subchapter-H/part-101/subpart-F/section-101.650" }
    ]
  },
  escalate: {
    title: "A remote change appears outside the maintenance window",
    summary: "OT review finds a vendor account login outside the approved maintenance window. A configuration checksum differs from the known baseline. The vendor has not confirmed any work.",
    facilitator: "Release the field mission. Listen for qualified OT isolation, GLAS escalation, local management notification, account containment, and preservation of logs and configuration evidence.",
    evidence: [
      { label: "Remote access", value: "Login outside approved window", detail: "The vendor has not confirmed the activity." },
      { label: "Configuration", value: "Checksum changed", detail: "The change is not in the approved work record." },
      { label: "Process data", value: "Integrity remains uncertain", detail: "Displayed values cannot yet support operations." },
      { label: "Confidence", value: "Credible cyberattack suspected", detail: "The complete scope remains unknown." }
    ],
    choices: [
      { id: "e1", text: "Have qualified OT personnel contain the remote access and unapproved change safely, call the GLAS emergency number, inform local management, and preserve logs and configuration evidence.", scores: { detection: 3, escalation: 4, operations: 4, reporting: 2, recovery: 3 } },
      { id: "e2", text: "Power off the affected controllers and workstation immediately, then notify IT after the process is safe.", scores: { detection: 2, escalation: 1, operations: 0, reporting: 1, recovery: 0 } },
      { id: "e3", text: "Ask the vendor to log in and reverse the change while the terminal continues preparing the transfer.", scores: { detection: 1, escalation: 0, operations: 0, reporting: 0, recovery: 0 } },
      { id: "e4", text: "Treat the mismatch as a maintenance issue until the next approved vendor window.", scores: { detection: 0, escalation: 0, operations: 1, reporting: 0, recovery: 0 } }
    ]
  },
  continue: {
    title: "The transfer cannot rely on uncertain data",
    summary: "The vessel is ready, but the team cannot yet establish a trusted configuration baseline for the affected process display. Independent checks are available, and the customer asks whether the transfer can start with manual verification.",
    facilitator: "Ask who has authority to pause or resume. Look for approved continuity procedures, independent verification, defined safety limits, and terminal leadership ownership.",
    evidence: [
      { label: "Safety", value: "No release or injury", detail: "The operation remains paused." },
      { label: "Integrity", value: "Baseline not established", detail: "The affected display cannot be trusted." },
      { label: "Alternate method", value: "Independent checks available", detail: "Use requires an approved process and leadership decision." },
      { label: "Schedule", value: "Vessel awaiting decision", detail: "Delay affects the berth and customer." }
    ],
    choices: [
      { id: "c1", text: "Keep the affected operation safely paused, activate the approved continuity process, complete trusted independent verification, and let terminal leadership authorize any return to service.", scores: { detection: 3, escalation: 3, operations: 4, reporting: 2, recovery: 3 } },
      { id: "c2", text: "Begin the transfer using field readings alone while OT restores the display configuration.", scores: { detection: 2, escalation: 1, operations: 1, reporting: 1, recovery: 1 } },
      { id: "c3", text: "Cancel every terminal movement until all IT and OT assets have been rebuilt.", scores: { detection: 2, escalation: 2, operations: 2, reporting: 1, recovery: 1 } },
      { id: "c4", text: "Let the control room decide alone because it owns the affected display.", scores: { detection: 1, escalation: 0, operations: 1, reporting: 0, recovery: 0 } }
    ]
  },
  report: {
    title: "Unauthorized OT access is now confirmed",
    summary: "Corporate responders confirm unauthorized use of a vendor account and an unapproved configuration change in the covered OT environment. The transfer remains paused and the potential process impact is still being assessed.",
    evidence: [
      { label: "Access", value: "Unauthorized vendor login", detail: "The session occurred outside an approved window." },
      { label: "Change", value: "OT configuration modified", detail: "The change was not authorized." },
      { label: "Impact", value: "Transfer remains paused", detail: "Operational disruption is confirmed." },
      { label: "Threshold", value: "Reportable cyber incident", detail: "The event involves and endangers a covered facility." }
    ]
  },
  recover: {
    title: "The terminal must restore trust before service",
    summary: "The unauthorized account is disabled and the known good configuration is available. The team must validate the baseline, field conditions, access controls, and monitoring before the affected process can return to service.",
    evidence: [
      { label: "Account", value: "Unauthorized access disabled", detail: "Related credentials and approvals remain under review." },
      { label: "Baseline", value: "Known good configuration available", detail: "Comparison and controlled restoration are required." },
      { label: "Field state", value: "Independent verification available", detail: "Physical conditions must match the restored data." },
      { label: "Return to service", value: "Phased decision required", detail: "Operations, IT, and OT must agree on evidence." }
    ],
    choices: [
      { id: "v1", text: "Validate the known good baseline and physical state, preserve evidence, review remote access, restore in phases with IT and OT monitoring, and record corrective actions.", scores: { detection: 3, escalation: 3, operations: 4, reporting: 3, recovery: 4 } },
      { id: "v2", text: "Load the known good configuration and begin the transfer immediately if the screen looks normal.", scores: { detection: 1, escalation: 1, operations: 1, reporting: 1, recovery: 1 } },
      { id: "v3", text: "Disable the vendor account permanently and close the incident because the transfer never started.", scores: { detection: 1, escalation: 1, operations: 2, reporting: 0, recovery: 1 } },
      { id: "v4", text: "Keep the process unavailable until an external investigator provides written clearance.", scores: { detection: 2, escalation: 2, operations: 1, reporting: 2, recovery: 2 } }
    ]
  }
});

const scenarioCatalog = {
  remote_access: {
    id: "remote_access",
    name: "Third party remote access",
    summary: "Unauthorized contractor access with potential IT and OT impact at a fictional maritime terminal",
    stages: remoteAccessStages
  },
  ransomware: {
    id: "ransomware",
    name: "Ransomware and shared operations files",
    summary: "Ransomware disrupts shared terminal records and threatens operational continuity",
    stages: ransomwareStages
  },
  data_integrity: {
    id: "data_integrity",
    name: "Data integrity and vessel transfer",
    summary: "Untrusted OT measurements and an unauthorized configuration change challenge a vessel transfer",
    stages: dataIntegrityStages
  }
};

let stages = remoteAccessStages;

const sourceDetails = {
  hoxhunt: {
    title: "Vopak Hoxhunt phishing reporting process",
    detail: "For a suspected phishing email in Vopak email, use the Hoxhunt reporting button. The report sends the potentially dangerous message to the Vopak SOC for analysis. If the user interacted with the message or there are signs of account, device, IT, OT, safety, or operational impact, Hoxhunt does not replace immediate escalation to local IT or the OT focal point. Confirm the current button location and local contact details before facilitating the exercise."
  },
  irbc: {
    title: "GIT CIS Guideline, Incident Response and Business Continuity",
    detail: "Use section 3 and Appendix A, pages 8 through 13. The guideline defines Assess the Situation, Begin the Escalation, and Continue the Operation. It also identifies safe isolation, GLAS escalation, local management involvement, recovery, and business continuity responsibilities."
  },
  otpolicy: {
    title: "Operational Technology Security Policy v1.2",
    detail: "Use section 5.2, Incident Management and Communication. The policy requires a process to detect and react to security incidents, communication plans, and drills that confirm documented actions are understood, practical, and achievable."
  },
  classification: {
    title: "Incident Classification, Reporting and Investigation Standard v8, June 2025",
    detail: "Use sections 7.1 and 7.2. Section 7.1 lists the basic notification facts and notes later recording in Enablon. Section 7.2 covers actual and potential severity and the investigation level."
  },
  brand: {
    title: "Vopak Brand Guidelines v3.0",
    detail: "Use the logo guidance and color chapter. The primary colors used here are Vopak Deep Blue #0a2373 and Vopak Cyan #00cfe1. The horizontal logo remains Deep Blue on a light background."
  }
};

const state = {
  config: null,
  currentStage: 0,
  activeTeam: 0,
  responses: [],
  revealed: stages.map(() => false),
  phishClues: new Set(),
  secondsRemaining: 0,
  timerRunning: false,
  timerId: null,
  startedAt: null,
  completedAt: null
};

const els = {
  setupView: document.getElementById("setupView"),
  exerciseView: document.getElementById("exerciseView"),
  resultsView: document.getElementById("resultsView"),
  setupForm: document.getElementById("setupForm"),
  teamTwoField: document.getElementById("teamTwoField"),
  fieldMissionToggle: document.getElementById("fieldMissionToggle"),
  missionFields: document.getElementById("missionFields"),
  stageNav: document.getElementById("stageNav"),
  sessionTimer: document.getElementById("sessionTimer"),
  timerToggle: document.getElementById("timerToggle"),
  modeLabel: document.getElementById("modeLabel"),
  scenarioLabel: document.getElementById("scenarioLabel"),
  progressLabel: document.getElementById("progressLabel"),
  phaseLabel: document.getElementById("phaseLabel"),
  phaseTime: document.getElementById("phaseTime"),
  phaseTitle: document.getElementById("phaseTitle"),
  phaseSummary: document.getElementById("phaseSummary"),
  evidenceArea: document.getElementById("evidenceArea"),
  missionArea: document.getElementById("missionArea"),
  teamSwitcher: document.getElementById("teamSwitcher"),
  responseContent: document.getElementById("responseContent"),
  facilitatorPrompt: document.getElementById("facilitatorPrompt"),
  revealButton: document.getElementById("revealButton"),
  nextButton: document.getElementById("nextButton"),
  sourcesDialog: document.getElementById("sourcesDialog"),
  helpDialog: document.getElementById("helpDialog"),
  sourceDetail: document.getElementById("sourceDetail"),
  resultsScenario: document.getElementById("resultsScenario"),
  scoreSummary: document.getElementById("scoreSummary"),
  categoryResults: document.getElementById("categoryResults")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTime(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map(value => String(value).padStart(2, "0")).join(":");
}

function teamNames() {
  return state.config.teams;
}

function currentStage() {
  return stages[state.currentStage];
}

function selectScenario(selection) {
  const scenarioIds = Object.keys(scenarioCatalog);
  let selectedId = selection;
  if (!scenarioCatalog[selectedId]) {
    const lastId = window.localStorage.getItem("vopakLastScenario");
    const available = scenarioIds.filter(id => id !== lastId);
    const pool = available.length ? available : scenarioIds;
    selectedId = pool[Math.floor(Math.random() * pool.length)];
  }
  window.localStorage.setItem("vopakLastScenario", selectedId);
  return scenarioCatalog[selectedId];
}

function responseFor(teamIndex, stageIndex = state.currentStage) {
  return state.responses[teamIndex][stageIndex];
}

function allTeamsSubmitted() {
  if (state.currentStage === 0) return true;
  return teamNames().every((_, teamIndex) => Boolean(responseFor(teamIndex)));
}

function startTimer() {
  stopTimer();
  state.timerRunning = true;
  els.timerToggle.textContent = "Pause";
  state.timerId = window.setInterval(() => {
    state.secondsRemaining = Math.max(0, state.secondsRemaining - 1);
    els.sessionTimer.textContent = formatTime(state.secondsRemaining);
    if (state.secondsRemaining === 0) {
      stopTimer();
      els.timerToggle.textContent = "Time expired";
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
  state.timerRunning = false;
}

function renderStageNav() {
  els.stageNav.innerHTML = stages.map((stage, index) => {
    const complete = index < state.currentStage;
    const current = index === state.currentStage;
    return `
      <button class="stage-item${complete ? " complete" : ""}" type="button" ${current ? 'aria-current="step"' : ""} disabled>
        <span class="stage-index">${complete ? "✓" : index + 1}</span>
        <span><strong>${escapeHtml(stage.nav)}</strong><small>${stage.time} minutes</small></span>
      </button>`;
  }).join("");
}

function renderEvidence(stage) {
  if (stage.email) {
    const clues = [
      { id: "sender", label: "From: field.support@vopak-maintenance.com", reason: "The lookalike domain is not a confirmed contractor address." },
      { id: "urgency", label: "Action required in the next 15 minutes", reason: "Artificial urgency pressures the recipient to bypass normal verification." },
      { id: "attachment", label: "Remote_Access_Update.zip", reason: "An unexpected compressed attachment can conceal executable content." },
      { id: "link", label: "Open secure maintenance portal", reason: "The displayed text does not establish where the link would actually lead." }
    ];
    els.evidenceArea.innerHTML = `
      <div class="email-card" aria-label="Simulated suspicious email">
        <div class="email-toolbar">Simulated email evidence</div>
        <div class="email-head">
          <strong>Revised maintenance access package</strong>
          <button class="phish-clue${state.phishClues.has("sender") ? " found" : ""}" type="button" data-clue="sender">From: field.support@vopak-maintenance.com</button>
          <span>To: Terminal Scheduling</span>
        </div>
        <div class="email-body">
          <p>Good morning,</p>
          <p>The access package failed overnight validation. <button class="phish-clue${state.phishClues.has("urgency") ? " found" : ""}" type="button" data-clue="urgency">Action required in the next 15 minutes</button> or today’s maintenance window will be cancelled.</p>
          <p><button class="phish-clue fake-link${state.phishClues.has("link") ? " found" : ""}" type="button" data-clue="link">Open secure maintenance portal</button></p>
          <p>Attachment: <button class="phish-clue${state.phishClues.has("attachment") ? " found" : ""}" type="button" data-clue="attachment">Remote_Access_Update.zip</button></p>
          <p>Field Support Team</p>
        </div>
      </div>
      <p class="clue-progress"><strong>${state.phishClues.size} of ${clues.length}</strong> indicators discussed. Select suspicious details to reveal why they matter.</p>
      <div id="clueExplanation" class="clue-explanation" ${state.phishClues.size ? "" : "hidden"}>Select an indicator to discuss it.</div>`;

    els.evidenceArea.querySelectorAll("[data-clue]").forEach(button => {
      button.addEventListener("click", () => {
        const clue = clues.find(item => item.id === button.dataset.clue);
        state.phishClues.add(clue.id);
        button.classList.add("found");
        const explanation = document.getElementById("clueExplanation");
        explanation.hidden = false;
        explanation.textContent = clue.reason;
        els.evidenceArea.querySelector(".clue-progress").innerHTML = `<strong>${state.phishClues.size} of ${clues.length}</strong> indicators discussed. Select suspicious details to reveal why they matter.`;
      });
    });
    return;
  }

  const evidence = stage.evidence || [];
  const className = state.currentStage === 0 ? "briefing-grid" : "evidence-grid";
  const cardClass = state.currentStage === 0 ? "briefing-item" : "evidence-card";
  els.evidenceArea.innerHTML = `<div class="${className}">${evidence.map(item => `
    <div class="${cardClass}">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      ${item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ""}
    </div>`).join("")}</div>`;
}

function renderMission(stage) {
  if (!stage.mission || !state.config.fieldMission) {
    els.missionArea.innerHTML = "";
    return;
  }
  els.missionArea.innerHTML = `
    <div class="field-mission">
      <div class="mission-icon" aria-hidden="true">↗</div>
      <div>
        <h3>Field mission</h3>
        <p>Locate the prepared <strong>${escapeHtml(state.config.missionRole)}</strong>. Ask which role initiates the Coast Guard notification in this exercise. Return with the code printed on the role card. Stay within the approved exercise area.</p>
      </div>
    </div>`;
}

function renderTeamSwitcher() {
  els.teamSwitcher.innerHTML = teamNames().map((name, index) => {
    const submitted = Boolean(responseFor(index));
    return `<button class="team-tab" type="button" role="tab" aria-selected="${index === state.activeTeam}" data-team="${index}">${escapeHtml(name)}${submitted ? " ✓" : ""}</button>`;
  }).join("");
  els.teamSwitcher.querySelectorAll("[data-team]").forEach(button => {
    button.addEventListener("click", () => {
      state.activeTeam = Number(button.dataset.team);
      renderTeamSwitcher();
      renderResponse();
    });
  });
}

function citationLinks(stage) {
  if (!stage.citations?.length) return "";
  return `<p class="citation-line">${stage.citations.map(citation => {
    if (citation.url) return `<a href="${citation.url}" target="_blank" rel="noreferrer">${escapeHtml(citation.label)}</a>`;
    return `<button class="text-link inline-source" type="button" data-inline-source="${citation.source}">${escapeHtml(citation.label)}</button>`;
  }).join(" · ")}</p>`;
}

function bindInlineSources() {
  document.querySelectorAll("[data-inline-source]").forEach(button => {
    button.addEventListener("click", () => {
      openSourceDetail(button.dataset.inlineSource);
      els.sourcesDialog.showModal();
    });
  });
}

function renderGuide(stage) {
  if (!state.revealed[state.currentStage] || !stage.guide) return "";
  return `
    <div class="discussion-guide">
      <h3>Discussion guide</h3>
      <p>${escapeHtml(stage.guide)}</p>
      ${citationLinks(stage)}
    </div>`;
}

function renderResponse() {
  const stage = currentStage();
  const teamIndex = state.activeTeam;
  const response = responseFor(teamIndex);
  const teamName = teamNames()[teamIndex];

  if (state.currentStage === 0) {
    els.responseContent.innerHTML = `
      <div class="response-intro">
        <h2>Participant roles</h2>
        <p>Include the roles available at your facility. One person may hold more than one role.</p>
      </div>
      <div class="choice-list">
        ${["Terminal leadership", "Facility Security Officer", "Cybersecurity Officer", "Operations", "Local IT", "OT focal point", "Communications or Legal observer"].map(role => `<label class="choice-option"><input type="checkbox"><span>${role}</span></label>`).join("")}
      </div>`;
    return;
  }

  if (response) {
    const choice = stage.choices?.find(item => item.id === response.choiceId);
    els.responseContent.innerHTML = `
      <div class="locked-response">
        <div>
          <div class="lock-mark">✓</div>
          <h2>${escapeHtml(teamName)} submitted</h2>
          <p>The response remains concealed while the other team works.</p>
        </div>
      </div>
      ${state.revealed[state.currentStage] ? `
        <div class="response-intro">
          <h2>Submitted response</h2>
          <p>${escapeHtml(choice ? choice.text : response.notes)}</p>
          ${response.notes && choice ? `<p><strong>Team reasoning:</strong> ${escapeHtml(response.notes)}</p>` : ""}
          ${response.missionAttempt ? `<p><strong>Field mission:</strong> ${response.missionCorrect ? "Code confirmed" : "Code not confirmed"}</p>` : ""}
        </div>
        ${renderGuide(stage)}` : ""}`;
    bindInlineSources();
    return;
  }

  if (stage.reflection) {
    els.responseContent.innerHTML = `
      <div class="response-intro">
        <h2>${escapeHtml(teamName)} reflection</h2>
        <p>Name one response improvement and the role that should own it.</p>
      </div>
      <form id="responseForm">
        <label class="field response-notes">
          <span>Team recommendation</span>
          <textarea name="notes" rows="8" required placeholder="Improvement, owner, and why it matters"></textarea>
        </label>
        <button class="primary-button submit-response" type="submit">Submit reflection <span aria-hidden="true">›</span></button>
      </form>
      ${renderGuide(stage)}`;
    bindResponseForm();
    bindInlineSources();
    return;
  }

  els.responseContent.innerHTML = `
    <div class="response-intro">
      <h2>${escapeHtml(teamName)} decision</h2>
      <p>${escapeHtml(stage.prompt)}</p>
    </div>
    <form id="responseForm">
      <div class="choice-list">
        ${stage.choices.map(choice => `
          <label class="choice-option">
            <input type="radio" name="choice" value="${choice.id}" required>
            <span>${escapeHtml(choice.text)}</span>
          </label>`).join("")}
      </div>
      <label class="field response-notes">
        <span>Reasoning and assumptions</span>
        <textarea name="notes" rows="4" placeholder="What do you know, what is unknown, and who owns the decision?"></textarea>
      </label>
      ${stage.mission && state.config.fieldMission ? `
        <label class="field response-notes">
          <span>Field mission code</span>
          <input name="missionCode" type="text" autocomplete="off" placeholder="Enter the code from the role player">
        </label>` : ""}
      <button class="primary-button submit-response" type="submit">Lock team response <span aria-hidden="true">›</span></button>
    </form>`;
  bindResponseForm();
}

function bindResponseForm() {
  const form = document.getElementById("responseForm");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const stage = currentStage();
    const missionAttempt = String(data.get("missionCode") || "").trim();
    state.responses[state.activeTeam][state.currentStage] = {
      choiceId: String(data.get("choice") || ""),
      notes: String(data.get("notes") || "").trim(),
      missionAttempt,
      missionCorrect: missionAttempt ? missionAttempt.toUpperCase() === state.config.missionCode.toUpperCase() : false,
      submittedAt: new Date().toISOString(),
      secondsRemaining: state.secondsRemaining,
      scores: stage.choices?.find(choice => choice.id === data.get("choice"))?.scores || {}
    };

    const nextOpenTeam = teamNames().findIndex((_, index) => !responseFor(index));
    if (nextOpenTeam >= 0) state.activeTeam = nextOpenTeam;
    renderTeamSwitcher();
    renderResponse();
    updateFacilitatorControls();
  });
}

function updateFacilitatorControls() {
  const stage = currentStage();
  const submitted = allTeamsSubmitted();
  const revealed = state.revealed[state.currentStage];

  if (state.currentStage === 0) {
    els.revealButton.disabled = true;
    els.nextButton.disabled = false;
    els.nextButton.innerHTML = 'Begin first inject <span aria-hidden="true">›</span>';
    return;
  }

  els.revealButton.disabled = !submitted || revealed;
  els.revealButton.textContent = revealed ? "Guide revealed" : "Reveal discussion guide";
  els.nextButton.disabled = !submitted || !revealed;
  els.nextButton.innerHTML = state.currentStage === stages.length - 1
    ? 'Complete exercise <span aria-hidden="true">›</span>'
    : 'Release next inject <span aria-hidden="true">›</span>';
}

function renderExercise() {
  const stage = currentStage();
  renderStageNav();
  els.modeLabel.textContent = teamNames().length === 1 ? "One team" : "Two teams";
  els.scenarioLabel.textContent = state.config.scenarioName;
  els.progressLabel.textContent = `${state.currentStage + 1} of ${stages.length}`;
  els.phaseLabel.textContent = stage.nav;
  els.phaseTime.textContent = `${stage.time} minutes`;
  els.phaseTitle.textContent = stage.title;
  els.phaseSummary.textContent = stage.summary;
  els.facilitatorPrompt.textContent = stage.facilitator;
  renderEvidence(stage);
  renderMission(stage);
  renderTeamSwitcher();
  renderResponse();
  updateFacilitatorControls();
}

function revealGuide() {
  if (!allTeamsSubmitted()) return;
  state.revealed[state.currentStage] = true;
  renderResponse();
  updateFacilitatorControls();
}

function advanceStage() {
  if (state.currentStage === stages.length - 1) {
    completeExercise();
    return;
  }
  state.currentStage += 1;
  state.activeTeam = 0;
  renderExercise();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scoreTeams() {
  const maximums = Object.fromEntries(categories.map(category => [category.id, 0]));
  stages.forEach(stage => {
    if (!stage.choices) return;
    categories.forEach(category => {
      maximums[category.id] += Math.max(...stage.choices.map(choice => choice.scores[category.id] || 0));
    });
  });
  if (state.config.fieldMission) maximums.escalation += 2;

  return teamNames().map((name, teamIndex) => {
    const raw = Object.fromEntries(categories.map(category => [category.id, 0]));
    state.responses[teamIndex].forEach(response => {
      if (!response) return;
      categories.forEach(category => {
        raw[category.id] += response.scores?.[category.id] || 0;
      });
      if (response.missionCorrect) raw.escalation += 2;
    });
    const normalized = Object.fromEntries(categories.map(category => {
      const max = maximums[category.id] || 1;
      return [category.id, Math.round((raw[category.id] / max) * 20)];
    }));
    const total = Math.round(categories.reduce((sum, category) => sum + normalized[category.id], 0));
    return { name, raw, normalized, total };
  });
}

function completeExercise() {
  stopTimer();
  state.completedAt = new Date().toISOString();
  els.exerciseView.hidden = true;
  els.resultsView.hidden = false;
  els.resultsScenario.textContent = `Scenario: ${state.config.scenarioName}`;
  const scores = scoreTeams();
  const highScore = Math.max(...scores.map(team => team.total));
  els.scoreSummary.innerHTML = scores.map(team => `
    <div class="team-score-card${scores.length > 1 && team.total === highScore ? " winner" : ""}">
      <span>${scores.length > 1 && team.total === highScore ? "Highest score" : "Exercise score"}</span>
      <strong>${team.total}<small>/100</small></strong>
      <p>${escapeHtml(team.name)}</p>
    </div>`).join("");

  els.categoryResults.innerHTML = categories.map(category => `
    <div class="category-row">
      <strong>${escapeHtml(category.label)}</strong>
      <div class="bar-stack">
        ${scores.map(team => `
          <div class="score-bar" title="${escapeHtml(team.name)}: ${team.normalized[category.id]} of 20">
            <div class="score-bar-track"><div class="score-bar-fill" style="width:${team.normalized[category.id] * 5}%"></div></div>
            <span>${team.normalized[category.id]}/20</span>
          </div>`).join("")}
      </div>
    </div>`).join("");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function exerciseRecord() {
  return {
    exercise: "Vopak Cyber Incident Tabletop",
    scenario: {
      id: state.config.scenarioId,
      name: state.config.scenarioName,
      summary: state.config.scenarioSummary
    },
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    durationMinutes: state.config.duration,
    fieldMissionEnabled: state.config.fieldMission,
    teams: teamNames().map((name, teamIndex) => ({
      name,
      score: scoreTeams()[teamIndex],
      responses: stages.map((stage, stageIndex) => {
        const response = state.responses[teamIndex][stageIndex];
        if (!response) return { stage: stage.nav, response: null };
        const choice = stage.choices?.find(item => item.id === response.choiceId);
        return {
          stage: stage.nav,
          decision: choice?.text || null,
          reasoning: response.notes,
          fieldMissionConfirmed: response.missionAttempt ? response.missionCorrect : null,
          submittedAt: response.submittedAt
        };
      })
    })),
    afterActionReview: {
      workedWell: document.getElementById("workedWell").value.trim(),
      slowedDown: document.getElementById("slowedDown").value.trim(),
      correctiveActions: document.getElementById("correctiveActions").value.trim()
    },
    complianceNote: "This exercise record supports documentation. Confirm all compliance records and corrective actions through the approved Vopak and facility processes."
  };
}

function downloadRecord() {
  const blob = new Blob([JSON.stringify(exerciseRecord(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `vopak-cyber-tabletop-${date}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function resetSession() {
  stopTimer();
  state.config = null;
  state.currentStage = 0;
  state.activeTeam = 0;
  state.responses = [];
  state.revealed = stages.map(() => false);
  state.phishClues = new Set();
  state.secondsRemaining = 0;
  state.startedAt = null;
  state.completedAt = null;
  els.exerciseView.hidden = true;
  els.resultsView.hidden = true;
  els.setupView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSourceDetail(id) {
  const detail = sourceDetails[id];
  if (!detail) return;
  els.sourceDetail.hidden = false;
  els.sourceDetail.innerHTML = `<h3>${escapeHtml(detail.title)}</h3><p>${escapeHtml(detail.detail)}</p>`;
}

document.querySelectorAll('input[name="teamCount"]').forEach(input => {
  input.addEventListener("change", () => {
    els.teamTwoField.hidden = input.value !== "2";
    document.getElementById("teamTwoName").required = input.value === "2";
  });
});

els.fieldMissionToggle.addEventListener("change", () => {
  els.missionFields.hidden = !els.fieldMissionToggle.checked;
});

els.setupForm.addEventListener("submit", event => {
  event.preventDefault();
  const count = Number(document.querySelector('input[name="teamCount"]:checked').value);
  const teams = [document.getElementById("teamOneName").value.trim() || "Team 1"];
  if (count === 2) teams.push(document.getElementById("teamTwoName").value.trim() || "Team 2");
  const duration = Number(document.getElementById("durationSelect").value);
  const scenario = selectScenario(document.getElementById("scenarioSelect").value);
  stages = scenario.stages;
  state.config = {
    teams,
    duration,
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    scenarioSummary: scenario.summary,
    fieldMission: els.fieldMissionToggle.checked,
    missionRole: document.getElementById("missionRole").value.trim() || "Facility Security Officer or designated delegate",
    missionCode: document.getElementById("missionCode").value.trim() || "HARBOR"
  };
  state.currentStage = 0;
  state.activeTeam = 0;
  state.revealed = stages.map(() => false);
  state.phishClues = new Set();
  state.responses = teams.map(() => stages.map(() => null));
  state.secondsRemaining = duration * 60;
  state.startedAt = new Date().toISOString();
  els.sessionTimer.textContent = formatTime(state.secondsRemaining);
  els.setupView.hidden = true;
  els.resultsView.hidden = true;
  els.exerciseView.hidden = false;
  renderExercise();
  startTimer();
  window.scrollTo({ top: 0 });
});

els.timerToggle.addEventListener("click", () => {
  if (state.secondsRemaining === 0) return;
  if (state.timerRunning) {
    stopTimer();
    els.timerToggle.textContent = "Resume";
  } else {
    startTimer();
  }
});

els.revealButton.addEventListener("click", revealGuide);
els.nextButton.addEventListener("click", advanceStage);

document.getElementById("restartButton").addEventListener("click", () => {
  if (window.confirm("Restart this exercise and clear all team responses?")) resetSession();
});

document.getElementById("newSessionButton").addEventListener("click", resetSession);
document.getElementById("printReportButton").addEventListener("click", () => window.print());
document.getElementById("downloadDataButton").addEventListener("click", downloadRecord);

document.getElementById("sourcesButton").addEventListener("click", () => els.sourcesDialog.showModal());
document.getElementById("helpButton").addEventListener("click", () => els.helpDialog.showModal());
document.querySelectorAll("[data-open-sources]").forEach(button => button.addEventListener("click", () => els.sourcesDialog.showModal()));

document.querySelectorAll("[data-source-detail]").forEach(button => {
  button.addEventListener("click", () => openSourceDetail(button.dataset.sourceDetail));
});

[els.sourcesDialog, els.helpDialog].forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
});
