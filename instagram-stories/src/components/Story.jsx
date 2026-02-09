import React, { useState } from "react";

const STORY_LIFETIME = 15_000;

const Story = () => {
  const [previewStoryUrl, setPreviewStoryUrl] = useState([]);

  const handleChange = (e) => {
    const file = e.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    const id = crypto.randomUUID();
    const storyObj = { id: id, imageUrl: imageUrl };

    setTimeout(() => {
      setPreviewStoryUrl((prev) =>
        prev.filter((story) => {
          if (story.id === id) {
            URL.revokeObjectURL(story.imageUrl);
          } else {
            return true;
          }
        }),
      );
    }, STORY_LIFETIME);

    setPreviewStoryUrl((prev) => [storyObj, ...prev]);
  };

  return (
    <>
      <div className="story-row">
        <label className="add-story">
          +
          <input type="file" hidden onChange={(e) => handleChange(e)} />
        </label>
        {previewStoryUrl.map((story) => {
          return (
            <div
              aria-label="preview-story"
              className="story-preview"
              key={story.id}
            >
              <img src={story.imageUrl} alt="Story Preview" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Story;

/* -------------------------------------------------------------------
   STORY PREVIEW (INSTAGRAM-LIKE TEMP STORIES)
   -------------------------------------------------------------------
   GOAL:
     Allow user to upload an image that appears instantly as a story preview.
     Each story auto-expires after a fixed time and is removed from UI.
     Browser memory is cleaned by revoking the blob URL.

   -------------------------------------------------------------------
   CONSTANTS:
     closeTime        → (unused) could be used for story viewer auto close
     STORY_LIFETIME   → how long a story stays visible (15 seconds)

   -------------------------------------------------------------------
   STATE:
     previewStoryUrl  → array of active stories
     Each story object:
        {
          id: unique identifier
          imageUrl: temporary blob URL for preview
        }

   -------------------------------------------------------------------
   IMAGE UPLOAD FLOW (handleChange):
     1. User selects a file from hidden input.
     2. Get the first file from the input.
     3. Create temporary blob URL using URL.createObjectURL(file).
        → This allows preview without uploading to server.
     4. Generate unique id using crypto.randomUUID().
     5. Create story object { id, imageUrl }.
     6. Add new story to beginning of state array.

   -------------------------------------------------------------------
   AUTO DELETE STORY (setTimeout):
     After STORY_LIFETIME:
       1. Find the story with matching id.
       2. Revoke its blob URL using URL.revokeObjectURL().
          → Prevents browser memory leaks.
       3. Remove the story from state using filter().
       4. Component re-renders → story disappears from UI.

   -------------------------------------------------------------------
   RENDER:
     Story Row contains:
       1. "+" upload button (hidden file input)
       2. List of all active stories

     For each story:
       - Render a container div
       - Render <img src={story.imageUrl}>
       - React key uses story.id for efficient re-rendering

   -------------------------------------------------------------------
   FLOW SUMMARY:
     Upload image → create blob URL → add to state → show preview
     After 15 sec → revoke URL → remove from state → disappear

   -------------------------------------------------------------------
   POTENTIAL IMPROVEMENTS:
     ✓ Support multiple file uploads
     ✓ Add file type & size validation
     ✓ Add progress/lifetime indicator
     ✓ Cleanup timers on component unmount
------------------------------------------------------------------- */
