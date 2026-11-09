# Architecture
Angular SPA: onboarding queue, applicant profile, document checklist, due-diligence checklist, decision workspace.
Backend boundary: API Gateway/BFF → Onboarding Service → Document Service → Identity Verification Adapter → Screening & Risk Service → Case Management → Audit Service.
Backend services own identity verification, screening, authorization, persistence, evidence retention, and authoritative case state.
