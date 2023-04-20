module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey:
        "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",
    },
    settings: {
      defaultFrom: "g.valentin.mosor@spiruharet.ro",
      defaultReplyTo: "g.valentin.mosor@spiruharet.ro",
    },
  },
  comments: {
    plugin: "comments",
    collection: "comment",
    via: "related",
    enableUsers: true,
    badWords: false,
    moderatorRoles: ["Admin"],
    relatedContentTypes: {
      pages: {
        uuid: "application::product.unique_id",
        contentManager: true,
        // isSingle: true, // optional
        __contentType: "",
        key: "title",
        value: "id",
        // url: "my-custom-url/:id", // optional
      },
    },
  },
  "email-designer": {
    editor: {
      tools: {
        heading: {
          properties: {
            text: {
              value: "This is the new default text!",
            },
          },
        },
      },
      options: {
        features: {
          colorPicker: {
            presets: ["#D9E3F0", "#F47373", "#697689", "#37D67A"],
          },
        },
        fonts: {
          showDefaultFonts: false,
          customFonts: [
            {
              label: "Anton",
              value: "'Anton', sans-serif",
              url: "https://fonts.googleapis.com/css?family=Anton",
            },
            {
              label: "Lato",
              value: "'Lato', Tahoma, Verdana, sans-serif",
              url: "https://fonts.googleapis.com/css?family=Lato",
            },
            // ...
          ],
        },
        mergeTags: [
          {
            name: "Email",
            value: "{{= USER.username }}",
            sample: "john@doe.com",
          },
          // ...
        ],
      },
      appearance: {
        theme: "dark",
        panels: {
          tools: {
            dock: "left",
          },
        },
      },
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
    },
  },
});
