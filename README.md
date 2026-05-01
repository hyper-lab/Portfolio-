High-Fidelity Interface
This section presents the high-fidelity interfaces of CasePoint based on the implemented system screens. The figures below show near-final layout, navigation structure, visual hierarchy, and role-based functions, along with a short explanation of what each screen does in the workflow.
<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/64e0d375-fc39-4ad7-be2f-3f78f75aea91" />
Figure 14. High-Fidelity Login Page. (Basic User, Advanced User, Admin)
Figure 14  Login Page (Basic User, Advanced User, Admin). The login page is the entry point. Users enter their email and password to access the system. The page also provides a "Forgot" link for password reset and shows the CasePoint branding and version indicator. All roles pass through the same login, and access is then filtered by role after authentication.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/cf2e4552-481e-4113-95d7-ae90cf70d664" />
Figure 15. High-Fidelity Source Library Interface(Basic User, Advanced User, Admin)
Figure 15 Source Library Interface (all roles). The library is the main working surface for documents. Each card shows the file name, case type, case sub-category, uploader, and indexing state (for example, "Ready"). Users can Preview, Download, or Re-index a file. Basic Users use this page to find and open documents they want to read. Advanced Users use the same page to add files to Active Sources, which limits the scope of the next AI query to only the selected documents.

<img width="975" height="508" alt="image" src="https://github.com/user-attachments/assets/c2a0428e-05a4-45ac-a075-57317181dbbf" />
Figure 16. High-Fidelity Upload Case Document Interface(Advanced User, Admin)
Figure 16Upload Case Document (Advanced User, Admin). This modal is how new records enter the system. The user selects the case type (Criminal or Non-Criminal), picks a sub-category, and drops in a PDF or DOCX file. After upload, CasePoint automatically converts DOCX to PDF, runs OCR if needed, extracts metadata, prepares chunks, and creates embeddings. Progress is reflected in the library card's status.



 <img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/23db6c82-9554-41b7-8026-91a991f6cfbf" />

Figure 17. High-Fidelity Document Preview Interface.(Basic User, Advanced User, Admin)
Figure 17  Document Preview (all roles). The preview opens the full document inline, with zoom, navigation, and download controls. Users can read the actual source instead of relying only on the AI's answer. This is important because even when the system produces a strong summary, the preview lets the user check the original text.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/8de8ad03-0b30-407e-b943-a9d817fa7a0c" />
Figure 18. High-Fidelity Semantic Search and Retrieval Interface.(Basic User, Advanced User, Admin)
Figure 18  Semantic Search and Retrieval (all roles). This is the AI chat interface. The user types a question about selected active sources, and the system returns an answer that is grounded in the retrieved chunks, along with suggested follow-up questions. The interface also lets the user choose between OpenAI and Ollama as the underlying model. When the user chooses OpenAI, a confirmation modal is shown (see the OpenAI data-privacy handling note below) so the user is aware that the query and context are being sent to an external provider.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/6e3a49cb-f1c1-46ce-8223-690cc3715fe1" />
Figure 19. High-Fidelity Search Results with Citations Page(Basic User, Advanced User, Admin)
Figure 19  Search Results with Citations (all roles). Every AI answer is paired with a Sources panel. Each citation shows the source file name, the page number, and a "Relevant Source" tag. Users can click a citation to open the exact passage. This design reflects the study's commitment to grounding: an answer without a source is treated as incomplete.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/3c0078c0-53af-471d-a3cb-e8bda06bdb91" />
Figure 20. – High-Fidelity Document Insights Dashboard (Basic User, Advanced User, Admin)
Figure 20 Document Insights Dashboard (all roles). The dashboard summarizes the library: indexed files, analyzed files, skipped files, and metadata coverage. It also breaks down counts by court level, decision type, and promulgation year. This helps staff understand the state of the corpus at a glance and spot files that still need metadata review.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/65139566-7dfe-4973-adad-1aa9f87cd78b" />
Figure 21. – High-Fidelity Labeled Files Panel (Basic User, Advanced User, Admin)
Figure 21 — Labeled Files Panel (all roles). This panel is where extracted metadata is reviewed. Each row shows the file's court level, decision type, promulgation year, and a confidence tag (for example, Inferred, Confirmed, Unverified). Advanced Users and Administrators can approve or correct each field. This is the mechanism that turns automatic extraction into trusted metadata, and it is directly tied to the confidence-level discussion in Chapter 2.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/1f97694e-7f7a-4efb-8517-85a7e134fbaa" />
Figure 22. – High-Fidelity Statistical Reports Page. (Admin)
Figure 22  Statistical Reports Page (Admin). This page generates system-wide analytics from the SQLite database: total documents, criminal and non-criminal case counts, case type breakdown, index status breakdown, sub-category distribution, upload timeline, and documents per uploader. Filters allow date range, case type, index status, and uploader. The page is restricted to the Administrator because it aggregates branch-wide data. 


<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/77e86002-252d-428a-b635-88acc1bc81f9" />
Figure 23. – High-Fidelity Admin Panel. (Admin)
Figure 23  Admin Panel   User Management (Admin). The admin panel lists all user accounts with role and last login. The Administrator can edit or delete users and create new ones.


<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/381ea635-a63d-4c34-b334-367779c422ac" />
Figure 24. – High-Fidelity Create User Modal ((Admin)
Figure 24  Create User Modal (Admin). This modal lets the Administrator add a new user by entering email, password, name, and role (Basic User, Advanced User, or Admin). Role selection here is what drives RBAC across the rest of the system.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/f0b2e3b5-b7a4-4907-8699-cdbd062af7af" />
Figure 25. – High-Fidelity Activity Logs Tab (Admin)
Figure 25  Activity Logs Tab (Admin). The activity logs tab shows a chronological record of user actions: login successes and failures, searches performed, uploads, and user updates. The Administrator can export the logs to CSV. This view makes the system auditable, which was one of the key requirements raised during the interviews.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/ff1c10ba-90b4-4cbe-9f5b-a583afab54ed" />
Figure 26. – High-Fidelity Advanced User Dashboard. (Advance User)
Figure 26 Advanced User Dashboard. The Advanced User dashboard is a minimal landing view. It displays the active sources panel and invites the user to either add a source or start a new chat. The design intentionally leads with action.

<img width="975" height="525" alt="image" src="https://github.com/user-attachments/assets/dc1d862a-16fb-40fa-8e70-aae2811c00ab" />
Figure 27. – High-Fidelity Basic User Dashboard. ( Basic User)
Figure 27  Basic User Dashboard. The Basic User dashboard mirrors the Advanced User view but without the upload and management options. Basic Users see only Library, Chat, and Document Insights in the sidebar.






