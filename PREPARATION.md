# Public preparation progress

`placement-tracker.html` shows Prince Raj's published progress to every visitor.
Visitors can search and filter questions, but cannot change the published checklist.
The public view reads `placement-progress.js`, never a visitor's browser storage.

## Update your progress

1. Open the tracker in the **same browser and at the same address** where you
   previously checked questions. Click **Update my progress** to open the draft
   workspace (`placement-tracker.html?edit=1`). Your existing saved ticks are kept.
2. Tick or untick questions. These changes are saved as a local draft. If your
   progress is on another device or address, use **Backup → Save progress backup**
   there, then **Backup → Restore from backup** in the draft workspace.
3. Click **Save public update**, then **Download progress file**. Replace the
   repository's `placement-progress.js` with that downloaded file. Browsers may
   append `(1)` to a download's name; the repository filename must stay
   `placement-progress.js`.
4. Commit and push the updated file:

   ```sh
   git add placement-progress.js
   git commit -m "Update preparation progress"
   git push origin main
   ```

After the site's deployment completes, visitors see that snapshot. They may need
to reload the page. A draft tick alone does not publish anything.

Only someone with permission to update the GitHub repository can publish changes.
The draft URL is a local editing workspace, not an authentication mechanism.
Opening it on another person's device only changes that person's local draft.

The initial snapshot is explicitly unpublished. No completed questions have been
invented or taken from browser tests. The percentage counts checked questions;
it is not an assessment of interview readiness.
