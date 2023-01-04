---
sidebar_position: 5
---

# Stimulus JS (Legacy)

We used this framework ins ome parts of the admin area, however we have made a decision to no longre use it and will be removing it in favour of using vanilla JavaScript or Preact where appropriate.

- Controllers in `app/javascript/admin/controllers`
- Hooks up to `html.erb` views with data attributes e.g. `data-controller="modal_controller, data-action="click->modal#onClick"`
- Layers interactivity onto server-rendered views
e.g. `app/javascript/admin/controllers/reaction_controller.js` used with `app/views/admin/feedback_messages/_abuse_reports.html.erb`
