/* ==========================================================================
   Caslumi — site configuration
   --------------------------------------------------------------------------
   Everything that changes when the business details change lives here.
   Edit this one file and every page picks it up.
   ========================================================================== */

window.CASLUMI = {
  /* ---- brand ---- */
  name: "Caslumi",
  tagline: "Aluminum Manufacturing Network",

  /* ---- contact -----------------------------------------------------------
     Changing `email` here updates the header, the footer, the contact page
     fallback and the RFQ mailto fallback in one go.

     TODO: once the company domain and the U.S. entity are live, switch this to
     a business address on your own domain (e.g. sales@caslumi.com). U.S. buyers
     read a personal or academic address as a smaller operation than you are.
     Empty fields below are omitted from the site rather than faked.
     ---------------------------------------------------------------------- */
  email: "jh5151@columbia.edu",
  emailLabel: "jh5151@columbia.edu",
  phone: "",            // e.g. "+1 (704) 555-0142"
  whatsapp: "",         // digits only, e.g. "8613800000000"
  wechat: "",           // WeChat ID
  usAddress: "",        // U.S. office address, once registered

  /* ---- RFQ form ----------------------------------------------------------
     A static site cannot send email on its own. Pick one provider, paste the
     endpoint here, and the RFQ form starts working — no code changes needed.

       Web3Forms  https://web3forms.com   -> endpoint stays as below,
                                             paste your key into formAccessKey
       Formspree  https://formspree.io    -> formEndpoint = "https://formspree.io/f/xxxxxxx"
                                             leave formAccessKey empty

     Both free tiers accept file uploads (PDF / DWG / STEP / images).
     While both fields are empty the form falls back to opening the visitor's
     email client with all answers pre-filled, so no enquiry is ever lost.
     ---------------------------------------------------------------------- */
  formEndpoint: "https://api.web3forms.com/submit",
  formAccessKey: "",    // <-- paste Web3Forms access key here to go live

  /* ---- production footprint ---- */
  plants: [
    { en: "Mingchuang",    zh: "明创",     focus: "Aluminum extrusion & profile production" },
    { en: "Baiming",       zh: "百明",     focus: "Furniture component fabrication" },
    { en: "Chuangmei",     zh: "创美",     focus: "Welding & frame assembly" },
    { en: "Mingteng Metal", zh: "明藤金属", focus: "Metal parts & hardware machining" },
    { en: "Mingshang",     zh: "明尚",     focus: "Surface finishing & coating" },
    { en: "Baihuiming",    zh: "百汇明",   focus: "Finished furniture production" },
    { en: "Yimeida",       zh: "亿美达",   focus: "Assembly, packing & export" }
  ]
};
