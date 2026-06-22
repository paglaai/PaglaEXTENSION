// Capital Sin - Notion API Integration

function sendToNotion(token, dbOrPg, markdown, cb) {
  // dbOrPg: either database_id, page_id, or blank
  const url = "https://api.notion.com/v1/pages";
  
  if (!dbOrPg) {
    return cb(false, "Database ID or Page ID is required");
  }

  // Determine parent type
  let parent = {};
  if (dbOrPg.length === 32 || (dbOrPg.includes('-') && dbOrPg.length === 36)) {
    parent = {database_id: dbOrPg.replace(/-/g, '')};
  } else {
    parent = {page_id: dbOrPg};
  }
  
  // Split markdown into 2000 character chunks for rich_text blocks
  const MAX_CHUNK_SIZE = 2000;
  const chunks = [];
  for (let i = 0; i < markdown.length; i += MAX_CHUNK_SIZE) {
    chunks.push(markdown.substring(i, i + MAX_CHUNK_SIZE));
  }

  const children = chunks.map(chunk => ({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: chunk
          }
        }
      ]
    }
  }));

  // Build Notion page payload
  const payload = {
    parent: parent,
    properties: {
      title: {
        title: [
          {
            text: {
              content: "Capital Sin Export - " + new Date().toLocaleString()
            }
          }
        ]
      }
    },
    children: children
  };
  
  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(d => {
    if (d.object === "error") {
      cb(false, d.message || "API Error");
    } else if (d.id) {
      cb(true, d.id);
    } else {
      cb(false, "Unknown response: " + JSON.stringify(d));
    }
  })
  .catch(e => cb(false, e.message));
}
