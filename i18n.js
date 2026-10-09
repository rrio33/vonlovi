(() => {
  const STORAGE_KEY = "vonlovi-lang";
  const DEFAULT = "fr";
  const SUPPORTED = ["fr", "en", "ja", "ko"];

  const dict = {
    fr: {
      "nav.shop": "Shop",
      "nav.panier": "Panier",
      "nav.about": "About",
      "nav.press": "Press",
      "nav.regards": "Regards",
      "nav.logo": "VONLOVI — accueil",
      "shop.pendentifs": "Pendentifs",
      "shop.bagues": "Bagues",
      "shop.boucles": "Boucles d'oreille",
      "shop.boutons": "Boutons",
      "shop.bracelets": "Bracelets",
      "cat.all": "Collection",
      "cat.pendentifs": "Pendentifs",
      "cat.bagues": "Bagues",
      "cat.boucles": "Boucles d'oreille",
      "cat.boutons": "Boutons",
      "cat.bracelets": "Bracelets",
      "home.hero": "Campagne",
      "home.prev": "Image précédente",
      "home.next": "Image suivante",
      "home.cats": "Catégories",
      "home.tile.pendentif": "Pendentif Nacre",
      "home.tile.bague": "Bague Onyx",
      "home.tile.boucle": "Boucle Onyx",
      "home.tile.bouton": "Bouton Onyx",
      "home.edit1.title": "Sur commande",
      "home.edit1.text":
        "Chaque pièce est réalisée sur commande, en or jaune 750/1000ème et pierres dures découpées Vonlovi. Un délai de 3 à 5 semaines permet à l'atelier d'honorer la précision du geste.",
      "home.edit1.cta": "Voir la Bague Nacre",
      "home.edit2.title": "L'univers Vonlovi",
      "home.edit2.text":
        "Vonlovi crée des bijoux sculpturaux où l'art rencontre l'artisanat. Conçus par De Rrusie, les pièces équilibrent matières précieuses, lignes organiques et précision architecturale.",
      "home.edit2.cta": "Voir la Boucle Cornaline",
      "home.edit3.title": "Regards",
      "home.edit3.text":
        "Les collaborateurs qui donnent à voir l'univers Vonlovi — photographes et regards de campagne.",
      "home.edit3.cta": "Découvrir Regards",
      "footer.contributors": "Regards",
      "contributors.title": "Regards",
      "contributors.lead":
        "Les collaborateurs qui façonnent l'image de Vonlovi. Choisissez un nom pour ouvrir sa galerie.",
      "contributors.images": "images",
      "contributors.back": "← Regards",
      "contributors.missing": "Collaborateur introuvable.",
      "contributors.unavailable": "Galerie indisponible.",
      "contributors.role.amanda-elise-k": "Photographie — still life",
      "contributors.role.stanislas-motz": "Photographie — campagnes LOOK",
      "contributors.role.celia-spenard-ko": "Photographie — campagnes",
      "contributors.role.goldie-williams": "Photographie — campagnes",
      "contributors.role.cyrille-robin": "Photographie — studio produit",
      "contributors.role.xavier-rosny": "Photographie — campagnes",
      "contributors.role.cristian-hunter": "Photographie — campagnes",
      "contributors.role.maxime-wolff": "Photographie — archives",
      "contributors.role.delawhere": "Film — campagnes",
      "contributors.role.ls-archives": "Archives — collaboration",
      "footer.service": "Service client",
      "footer.livraison": "Livraison",
      "footer.retours": "Retours",
      "footer.entretien": "Entretien",
      "footer.contact": "Contact",
      "footer.stockists": "Stockists",
      "footer.maison": "Vonlovi",
      "footer.about": "À propos",
      "footer.press": "Press",
      "footer.collection": "Collection",
      "footer.newsletter": "Newsletter",
      "footer.newsletter.text":
        "Inscrivez-vous pour découvrir les nouveautés et l'univers Vonlovi.",
      "footer.email": "E-mail",
      "footer.email.ph": "Votre e-mail",
      "footer.send": "Envoyer",
      "footer.write": "Écrire",
      "footer.mentions": "Mentions légales",
      "footer.cgv": "Conditions générales",
      "footer.privacy": "Confidentialité",
      "footer.email.error": "Indiquez une adresse juste.",
      "cookie.text": "Ce lieu se souvient du passage.",
      "cookie.ok": "Continuer",
      "cookie.more": "Confidentialité",
      "product.add": "Ajouter au panier",
      "product.size": "Taille",
      "product.size.choose": "Choisir la taille",
      "product.size.guide":
        "Taille européenne : circonférence intérieure, en millimètres. Le diamètre du doigt figure entre parenthèses.",
      "product.bracelet.length": "Longueur",
      "product.bracelet.length.choose": "Choisir la longueur",
      "product.bracelet.color": "Couleur",
      "product.bracelet.color.choose": "Choisir la couleur",
      "product.color.noir": "Noir",
      "product.color.bordeaux": "Bordeaux",
      "product.assurances":
        "Sur commande, trois à cinq semaines. Or jaune 750/1000, poinçons de garantie. Livraison DHL. Retours sous 14 jours, hors pièces personnalisées. <a href=\"shipping.html\">Livraison</a> · <a href=\"returns.html\">Retours</a> · <a href=\"care.html\">Entretien</a>.",
      "panier.size": "Taille",
      "product.missing": "Produit introuvable.",
      "product.unavailable": "Catalogue indisponible.",
      "product.loading": "Chargement…",
      "collection.empty": "Aucun produit.",
      "collection.unavailable": "Catalogue indisponible.",
      "panier.step": "Panier · 1 / 2",
      "panier.title": "Votre panier",
      "panier.back": "← Continuer",
      "checkout.back": "← Panier",
      "panier.empty": "Votre panier est vide.",
      "panier.continue": "Continuer vos achats",
      "panier.remove": "Retirer",
      "panier.total": "Total",
      "panier.checkout": "Commander",
      "checkout.step": "Commande · 2 / 2",
      "checkout.title": "Vos coordonnées",
      "checkout.note":
        "Chaque pièce est réalisée sur commande (3 à 5 semaines). Ce formulaire enregistre votre demande — le paiement sera confirmé par e-mail.",
      "checkout.name": "Nom",
      "checkout.email": "E-mail",
      "checkout.phone": "Téléphone",
      "checkout.address": "Adresse de livraison",
      "checkout.submit": "Confirmer la commande",
      "checkout.done.step": "Confirmé",
      "checkout.done.title": "Merci",
      "checkout.done.note":
        "Votre demande a bien été enregistrée ({total}). Nous vous contactons à {email} pour finaliser le paiement et le délai de fabrication.",
      "checkout.done.home": "Retour à l'accueil",
      "stockists.title": "Stockists",
      "stockists.intro":
        "Retrouvez Vonlovi en ligne et auprès de partenaires sélectionnés. Pour toute demande de référencement, écrivez-nous.",
      "stockists.online": "Boutique en ligne",
      "stockists.online.text": "Commandez directement sur vonlovi.com — pièces réalisées sur commande, délai 3 à 5 semaines.",
      "stockists.beige.name": "Beige Habilleur",
      "stockists.beige.place": "France",
      "stockists.beige.text": "Boutique — 86 rue Bonaparte, 75006 Paris.",
      "stockists.envers.name": "L'Envers Showroom",
      "stockists.envers.place": "Japan",
      "stockists.envers.text": "Showroom — Japon.",
      "stockists.paris": "Paris",
      "stockists.paris.text": "Showroom sur rendez-vous — contactez-nous pour organiser une présentation privée.",
      "stockists.jura": "Jura",
      "stockists.jura.text": "Pierres dures taillées dans les montagnes du Jura, au cœur du savoir-faire Vonlovi.",
      "stockists.partners": "Partenaires",
      "stockists.partners.text":
        "Vous êtes détaillant ou galerie ? Écrivez à contact@vonlovi.com pour rejoindre le réseau de stockists.",
      "stockists.contact": "Nous contacter",
      "shipping.title": "Livraison",
      "shipping.intro":
        "Chaque pièce Vonlovi est réalisée sur commande (environ 3 à 5 semaines). Une fois disponible, l'expédition suit les modalités ci-dessous.",
      "shipping.zones.label": "Zones de livraison",
      "shipping.zones.text":
        "VONLOVI assure les livraisons en France métropolitaine (y compris la Corse), dans tous les pays de l'Union européenne, en Suisse, au Royaume-Uni et aux États-Unis. Pour tout autre pays, contactez contact@vonlovi.com.",
      "shipping.delay.label": "Délais",
      "shipping.delay.text":
        "Fabrication sur commande : environ 3 à 5 semaines. Une fois le bijou disponible, livraison indicative sous 1 à 5 jours ouvrés après confirmation. Préparation sous 1 à 2 jours ouvrés, puis prise en charge par le transporteur.",
      "shipping.fees.label": "Transporteur & frais",
      "shipping.fees.text":
        "DHL — livraison de 9h à 17h, du lundi au vendredi (hors jours fériés), sous environ 48h. Offerte en Europe. États-Unis : 50 €.",
      "shipping.track.label": "Suivi",
      "shipping.track.text":
        "À l'expédition, un e-mail vous communique le numéro de suivi. En cas d'absence, le transporteur laisse un avis de passage avec les modalités de retrait.",
      "returns.title": "Retours",
      "returns.intro":
        "Vous disposez de 14 jours à compter de la réception pour retourner tout ou partie de votre commande, sauf pièces personnalisées (gravure, modification de taille, etc.).",
      "returns.terms.label": "Conditions",
      "returns.terms.text":
        "Les articles doivent être retournés dans leur état d'origine, non utilisés, avec étiquettes intactes et emballage d'origine. VONLOVI se réserve le droit de refuser un retour non conforme.",
      "returns.how.label": "Procédure",
      "returns.how.text":
        "1. Écrivez à contact@vonlovi.com avec votre numéro de commande et les produits concernés.<br />2. Le service client confirme le retour par e-mail.<br />3. Emballez les pièces complètes dans leur écrin d'origine, avec le formulaire de retour.<br />4. Expédiez sous 14 jours après autorisation à l'adresse indiquée.<br />5. Après contrôle qualité, remboursement sous un mois.",
      "returns.address.label": "Adresse de retour",
      "returns.address.text":
        "TEMIS LUXURY France — VONLOVI Service Retours<br />31 rue Blaise Pascal<br />93600 Aulnay-sous-Bois<br />France",
      "returns.fees.label": "Frais & remboursement",
      "returns.fees.text":
        "Les frais de retour restent à votre charge. Le colis doit être suivi et assuré. Le remboursement porte sur le prix des produits (hors frais d'envoi initiaux), sur le moyen de paiement d'origine. Pas d'échange — une nouvelle commande est nécessaire.",
      "care.title": "Entretien",
      "care.intro":
        "Quelques gestes simples pour préserver l'éclat de vos pièces Vonlovi — or 750, pierres dures, nacres et diamants.",
      "care.contact.label": "Produits & parfums",
      "care.contact.text":
        "Évitez le contact avec parfums, savons, produits chimiques et cosmétiques, qui peuvent altérer la couleur et l'aspect naturel des matières.",
      "care.water.label": "Eau & chaleur",
      "care.water.text":
        "N'exposez pas votre bijou à l'eau (douce, chlorée ou saline), ni à des températures élevées (exposition prolongée au soleil).",
      "care.activity.label": "Activités",
      "care.activity.text":
        "Retirez vos bijoux pour le sport, le jardinage et toute activité où ils pourraient subir des chocs ou entrer en contact avec des produits.",
      "care.clean.label": "Nettoyage & rangement",
      "care.clean.text":
        "Nettoyez régulièrement avec un chiffon doux et sec. Les diamants peuvent être nettoyés à la brosse souple avec un savon liquide pH neutre, rincés à l'eau tiède et séchés avec un chiffon doux. Rangez chaque pièce individuellement dans son écrin d'origine pour éviter les rayures.",
      "press.title": "Press",
      "press.intro": "Vonlovi dans la presse — sélection de parutions.",
      "press.etiquette.name": "Étiquette Magazine",
      "press.etiquette.place": "France",
      "press.etiquette.text": "Parution dans Étiquette Magazine, France.",
      "press.them.name": "Them Magazine",
      "press.them.place": "Japan",
      "press.them.text": "Parution dans Them Magazine, Japon.",
      "about.label1": "À propos",
      "about.p1":
        "VONLOVI est une maison de joaillerie contemporaine fondée à Paris par l'artiste De Rrusie. La marque répond à une envie plutôt qu'à un besoin : une création sortie de terre, portée par un peintre qui tisse un lien entre art et joaillerie. Trois syllabes — VON·LO·VI — choisies pour leur musicalité, comme une poésie énigmatique, et comme un rappel de toujours vivre d'amour.",
      "about.label2": "La maison",
      "about.p2":
        "Au confluent de l'art et de la peinture, Vonlovi se déploie entre trois territoires. C'est une rencontre, dans le Jura, avec un lapidaire, qui a donné aux pierres dures leur coupe : Paris crée ; le Jura taille ; le Portugal fait à la main. Chaque pièce est réalisée sur commande ; trois à cinq semaines sont nécessaires.",
      "about.label3": "L'artiste",
      "about.p3":
        "De Rrusie est peintre. Sur ses toiles, il met en scène l'immensité et l'abstraction des ciels. Avec Vonlovi, il s'intéresse au précieux, se rapproche de l'infiniment petit, du délicat. Les bijoux qui en naissent sont physiques, personnels et sensuels.",
      "about.label4": "Contact",
    },
    en: {
      "nav.shop": "Shop",
      "nav.panier": "Bag",
      "nav.about": "About",
      "nav.press": "Press",
      "nav.regards": "Regards",
      "nav.logo": "VONLOVI — home",
      "shop.pendentifs": "Pendants",
      "shop.bagues": "Rings",
      "shop.boucles": "Earrings",
      "shop.boutons": "Buttons",
      "shop.bracelets": "Bracelets",
      "cat.all": "Collection",
      "cat.pendentifs": "Pendants",
      "cat.bagues": "Rings",
      "cat.boucles": "Earrings",
      "cat.boutons": "Buttons",
      "cat.bracelets": "Bracelets",
      "home.hero": "Campaign",
      "home.prev": "Previous image",
      "home.next": "Next image",
      "home.cats": "Categories",
      "home.tile.pendentif": "Mother-of-pearl Pendant",
      "home.tile.bague": "Onyx Ring",
      "home.tile.boucle": "Onyx Earring",
      "home.tile.bouton": "Onyx Button",
      "home.edit1.title": "Made to order",
      "home.edit1.text":
        "Every piece is made to order in 18k yellow gold with Vonlovi-cut hardstones. Allow three to five weeks for the atelier to honour each gesture.",
      "home.edit1.cta": "View the Nacre Ring",
      "home.edit2.title": "The Vonlovi world",
      "home.edit2.text":
        "Vonlovi creates sculptural jewels where art meets craft. Designed by De Rrusie, each piece balances precious materials, organic lines and architectural precision.",
      "home.edit2.cta": "View the Carnelian Earring",
      "home.edit3.title": "Regards",
      "home.edit3.text":
        "The collaborators who give form to the Vonlovi world — photographers and campaign gazes.",
      "home.edit3.cta": "Discover Regards",
      "footer.contributors": "Regards",
      "contributors.title": "Regards",
      "contributors.lead":
        "The collaborators who shape the image of Vonlovi. Choose a name to open their gallery.",
      "contributors.images": "images",
      "contributors.back": "← Regards",
      "contributors.missing": "Collaborator not found.",
      "contributors.unavailable": "Gallery unavailable.",
      "contributors.role.amanda-elise-k": "Photography — still life",
      "contributors.role.stanislas-motz": "Photography — LOOK campaigns",
      "contributors.role.celia-spenard-ko": "Photography — campaigns",
      "contributors.role.goldie-williams": "Photography — campaigns",
      "contributors.role.cyrille-robin": "Photography — product studio",
      "contributors.role.xavier-rosny": "Photography — campaigns",
      "contributors.role.cristian-hunter": "Photography — campaigns",
      "contributors.role.maxime-wolff": "Photography — archives",
      "contributors.role.delawhere": "Film — campaigns",
      "contributors.role.ls-archives": "Archives — collaboration",
      "footer.service": "Client services",
      "footer.livraison": "Shipping",
      "footer.retours": "Returns",
      "footer.entretien": "Care",
      "footer.contact": "Contact",
      "footer.stockists": "Stockists",
      "footer.maison": "Vonlovi",
      "footer.about": "About",
      "footer.press": "Press",
      "footer.collection": "Collection",
      "footer.newsletter": "Newsletter",
      "footer.newsletter.text": "Subscribe to discover new pieces and the Vonlovi universe.",
      "footer.email": "Email",
      "footer.email.ph": "Your email",
      "footer.send": "Send",
      "footer.write": "Write",
      "footer.mentions": "Legal notice",
      "footer.cgv": "Terms",
      "footer.privacy": "Privacy",
      "footer.email.error": "Please enter a valid address.",
      "cookie.text": "This house remembers the visit.",
      "cookie.ok": "Continue",
      "cookie.more": "Privacy",
      "product.add": "Add to bag",
      "product.size": "Size",
      "product.size.choose": "Choose a size",
      "product.size.guide":
        "European size: inner circumference, in millimetres. Finger diameter is shown in parentheses.",
      "product.bracelet.length": "Length",
      "product.bracelet.length.choose": "Choose a length",
      "product.bracelet.color": "Colour",
      "product.bracelet.color.choose": "Choose a colour",
      "product.color.noir": "Black",
      "product.color.bordeaux": "Bordeaux",
      "product.assurances":
        "Made to order, three to five weeks. 18k yellow gold 750/1000, hallmarks of guarantee. DHL delivery. Returns within 14 days, except personalised pieces. <a href=\"shipping.html\">Shipping</a> · <a href=\"returns.html\">Returns</a> · <a href=\"care.html\">Care</a>.",
      "panier.size": "Size",
      "product.missing": "Product not found.",
      "product.unavailable": "Catalogue unavailable.",
      "product.loading": "Loading…",
      "collection.empty": "No products.",
      "collection.unavailable": "Catalogue unavailable.",
      "panier.step": "Bag · 1 / 2",
      "panier.title": "Your bag",
      "panier.back": "← Continue",
      "checkout.back": "← Bag",
      "panier.empty": "Your bag is empty.",
      "panier.continue": "Continue shopping",
      "panier.remove": "Remove",
      "panier.total": "Total",
      "panier.checkout": "Checkout",
      "checkout.step": "Checkout · 2 / 2",
      "checkout.title": "Your details",
      "checkout.note":
        "Every piece is made to order (3 to 5 weeks). This form records your request — payment will be confirmed by email.",
      "checkout.name": "Name",
      "checkout.email": "Email",
      "checkout.phone": "Phone",
      "checkout.address": "Delivery address",
      "checkout.submit": "Confirm order",
      "checkout.done.step": "Confirmed",
      "checkout.done.title": "Thank you",
      "checkout.done.note":
        "Your request has been recorded ({total}). We will contact you at {email} to finalise payment and the production timeline.",
      "checkout.done.home": "Back to home",
      "stockists.title": "Stockists",
      "stockists.intro":
        "Find Vonlovi online and with selected partners. For stockist enquiries, write to us.",
      "stockists.online": "Online boutique",
      "stockists.online.text":
        "Order directly at vonlovi.com — each piece made to order, three to five weeks.",
      "stockists.beige.name": "Beige Habilleur",
      "stockists.beige.place": "France",
      "stockists.beige.text": "Boutique — 86 rue Bonaparte, 75006 Paris.",
      "stockists.envers.name": "L'Envers Showroom",
      "stockists.envers.place": "Japan",
      "stockists.envers.text": "Showroom — Japan.",
      "stockists.paris": "Paris",
      "stockists.paris.text": "Showroom by appointment — contact us to arrange a private viewing.",
      "stockists.jura": "Jura",
      "stockists.jura.text": "Hardstones cut in the Jura mountains, at the heart of Vonlovi craft.",
      "stockists.partners": "Partners",
      "stockists.partners.text":
        "Retailer or gallery? Write to contact@vonlovi.com to join the stockist network.",
      "stockists.contact": "Contact us",
      "shipping.title": "Shipping",
      "shipping.intro":
        "Each Vonlovi piece is made to order (about 3 to 5 weeks). Once available, shipping follows the terms below.",
      "shipping.zones.label": "Delivery areas",
      "shipping.zones.text":
        "VONLOVI delivers to metropolitan France (including Corsica), all European Union countries, Switzerland, the United Kingdom, and the United States. For any other country, contact contact@vonlovi.com.",
      "shipping.delay.label": "Timelines",
      "shipping.delay.text":
        "Made to order: about 3 to 5 weeks. Once the jewellery is available, estimated delivery within 1 to 5 business days after confirmation. Prepared within 1 to 2 business days, then collected by the carrier.",
      "shipping.fees.label": "Carrier & fees",
      "shipping.fees.text":
        "DHL — delivery 9am–5pm, Monday to Friday (excluding holidays), within about 48 hours. Free in Europe. USA: €50.",
      "shipping.track.label": "Tracking",
      "shipping.track.text":
        "When your order ships, an email provides the tracking number. If you are away, the carrier leaves a delivery notice with collection instructions.",
      "returns.title": "Returns",
      "returns.intro":
        "You may return all or part of your order within 14 days of receipt, except personalised pieces (engraving, resizing, etc.).",
      "returns.terms.label": "Conditions",
      "returns.terms.text":
        "Items must be returned unused, in original condition, with tags intact and original packaging. VONLOVI reserves the right to refuse non-compliant returns.",
      "returns.how.label": "How to proceed",
      "returns.how.text":
        "1. Email contact@vonlovi.com with your order number and the products concerned.<br />2. Customer service confirms the return by email.<br />3. Pack the complete pieces in their original case with the return form.<br />4. Ship within 14 days of authorisation to the address below.<br />5. After quality checks, refund within one month.",
      "returns.address.label": "Return address",
      "returns.address.text":
        "TEMIS LUXURY France — VONLOVI Returns<br />31 rue Blaise Pascal<br />93600 Aulnay-sous-Bois<br />France",
      "returns.fees.label": "Fees & refund",
      "returns.fees.text":
        "Return shipping is at your expense. The parcel must be tracked and insured. Refunds cover product prices (excluding original outbound shipping) to the original payment method. No exchanges — please place a new order.",
      "care.title": "Care",
      "care.intro":
        "A few simple gestures to preserve the brilliance of your Vonlovi pieces — 18k gold, hardstones, mother-of-pearl and diamonds.",
      "care.contact.label": "Products & perfume",
      "care.contact.text":
        "Avoid contact with perfume, soap, chemicals and cosmetics, which can alter the colour and natural appearance of the materials.",
      "care.water.label": "Water & heat",
      "care.water.text":
        "Do not expose your jewellery to water (fresh, chlorinated or salt), or to high temperatures (prolonged sun exposure).",
      "care.activity.label": "Activities",
      "care.activity.text":
        "Remove your jewellery for sport, gardening and any activity where it might be knocked or exposed to products.",
      "care.clean.label": "Cleaning & storage",
      "care.clean.text":
        "Clean regularly with a soft dry cloth. Diamonds may be cleaned with a soft brush and mild pH-neutral liquid soap, rinsed in lukewarm water and dried with a soft cloth. Store each piece individually in its original case to avoid scratches.",
      "press.title": "Press",
      "press.intro": "Vonlovi in the press — selected features.",
      "press.etiquette.name": "Étiquette Magazine",
      "press.etiquette.place": "France",
      "press.etiquette.text": "Featured in Étiquette Magazine, France.",
      "press.them.name": "Them Magazine",
      "press.them.place": "Japan",
      "press.them.text": "Featured in Them Magazine, Japan.",
      "about.label1": "About",
      "about.p1":
        "VONLOVI is a contemporary jewellery house founded in Paris by the artist De Rrusie. The brand answers a desire rather than a need: a creation drawn from the earth, carried by a painter who weaves art and jewellery together. Three syllables — VON·LO·VI — chosen for their music, like an enigmatic poem, and as a reminder to always live from love.",
      "about.label2": "The house",
      "about.p2":
        "At the confluence of art and painting, Vonlovi unfolds across three territories. It was a meeting, in the Jura, with a lapidary that gave the hardstones their cut: Paris creates; the Jura cuts; Portugal makes by hand. Each piece is made to order; three to five weeks are required.",
      "about.label3": "The artist",
      "about.p3":
        "De Rrusie is a painter. On his canvases he stages the immensity and abstraction of skies. With Vonlovi he turns to the precious, drawing closer to the infinitely small, the delicate. The jewels that follow are physical, personal and sensual.",
      "about.label4": "Contact",
    },
    ja: {
      "nav.shop": "ショップ",
      "nav.panier": "カート",
      "nav.about": "について",
      "nav.press": "プレス",
      "nav.regards": "Regards",
      "nav.logo": "VONLOVI — ホーム",
      "shop.pendentifs": "ペンダント",
      "shop.bagues": "リング",
      "shop.boucles": "イヤリング",
      "shop.boutons": "ボタン",
      "shop.bracelets": "ブレスレット",
      "cat.all": "コレクション",
      "cat.pendentifs": "ペンダント",
      "cat.bagues": "リング",
      "cat.boucles": "イヤリング",
      "cat.boutons": "ボタン",
      "cat.bracelets": "ブレスレット",
      "home.hero": "キャンペーン",
      "home.prev": "前の画像",
      "home.next": "次の画像",
      "home.cats": "カテゴリー",
      "home.tile.pendentif": "白蝶貝ペンダント",
      "home.tile.bague": "オニキスリング",
      "home.tile.boucle": "オニキスピアス",
      "home.tile.bouton": "オニキスボタン",
      "home.edit1.title": "オーダーメイド",
      "home.edit1.text":
        "すべてのピースは、18金イエローゴールドとVonloviカットの硬石で受注制作されます。アトリエが一つひとつの所作を大切にするために、3〜5週間ほどお時間をいただきます。",
      "home.edit1.cta": "ナクレ リングを見る",
      "home.edit2.title": "Vonloviの世界",
      "home.edit2.text":
        "Vonloviは、アートとクラフトが出会う彫刻的なジュエリーをつくります。De Rrusieによるデザインは、貴金属、有機的なライン、建築的な精度の均衡を保ちます。",
      "home.edit2.cta": "カーネリアン ピアスを見る",
      "home.edit3.title": "Regards",
      "home.edit3.text":
        "Vonloviの世界を映すコラボレーターたち — 写真家とキャンペーンの視線。",
      "home.edit3.cta": "Regardsを見る",
      "footer.contributors": "Regards",
      "contributors.title": "Regards",
      "contributors.lead":
        "Vonloviのイメージを形づくるコラボレーターたち。名前を選んでギャラリーを開いてください。",
      "contributors.images": "枚",
      "contributors.back": "← Regards",
      "contributors.missing": "見つかりません。",
      "contributors.unavailable": "ギャラリーを読み込めません。",
      "contributors.role.amanda-elise-k": "写真 — スティルライフ",
      "contributors.role.stanislas-motz": "写真 — LOOKキャンペーン",
      "contributors.role.celia-spenard-ko": "写真 — キャンペーン",
      "contributors.role.goldie-williams": "写真 — キャンペーン",
      "contributors.role.cyrille-robin": "写真 — プロダクトスタジオ",
      "contributors.role.xavier-rosny": "写真 — キャンペーン",
      "contributors.role.cristian-hunter": "写真 — キャンペーン",
      "contributors.role.maxime-wolff": "写真 — アーカイブ",
      "contributors.role.delawhere": "フィルム — キャンペーン",
      "contributors.role.ls-archives": "アーカイブ — コラボレーション",
      "footer.service": "カスタマーサービス",
      "footer.livraison": "配送",
      "footer.retours": "返品",
      "footer.entretien": "お手入れ",
      "footer.contact": "お問い合わせ",
      "footer.stockists": "取扱店舗",
      "footer.maison": "Vonlovi",
      "footer.about": "について",
      "footer.press": "プレス",
      "footer.collection": "コレクション",
      "footer.newsletter": "ニュースレター",
      "footer.newsletter.text": "新作とVonloviの世界をお届けします。",
      "footer.email": "メール",
      "footer.email.ph": "メールアドレス",
      "footer.send": "送信",
      "footer.write": "書く",
      "footer.mentions": "法的表記",
      "footer.cgv": "利用規約",
      "footer.privacy": "プライバシー",
      "footer.email.error": "正しいアドレスを入力してください。",
      "cookie.text": "この場所は、来訪を覚えます。",
      "cookie.ok": "続ける",
      "cookie.more": "プライバシー",
      "product.add": "カートに入れる",
      "product.size": "サイズ",
      "product.size.choose": "サイズを選ぶ",
      "product.size.guide":
        "欧州サイズ：内周（ミリメートル）。括弧内は指の直径です。",
      "product.bracelet.length": "長さ",
      "product.bracelet.length.choose": "長さを選ぶ",
      "product.bracelet.color": "カラー",
      "product.bracelet.color.choose": "カラーを選ぶ",
      "product.color.noir": "ノワール",
      "product.color.bordeaux": "ボルドー",
      "product.assurances":
        "受注制作、3〜5週間。イエローゴールド750/1000、保証の刻印。DHL配送。受領後14日以内の返品（特注を除く）。<a href=\"shipping.html\">配送</a> · <a href=\"returns.html\">返品</a> · <a href=\"care.html\">お手入れ</a>。",
      "panier.size": "サイズ",
      "product.missing": "商品が見つかりません。",
      "product.unavailable": "カタログを読み込めません。",
      "product.loading": "読み込み中…",
      "collection.empty": "商品がありません。",
      "collection.unavailable": "カタログを読み込めません。",
      "panier.step": "カート · 1 / 2",
      "panier.title": "ショッピングバッグ",
      "panier.back": "← 続ける",
      "checkout.back": "← カート",
      "panier.empty": "カートは空です。",
      "panier.continue": "買い物を続ける",
      "panier.remove": "削除",
      "panier.total": "合計",
      "panier.checkout": "注文する",
      "checkout.step": "注文 · 2 / 2",
      "checkout.title": "お客様情報",
      "checkout.note":
        "すべてのピースは受注制作です（3〜5週間）。このフォームでご依頼を承ります — お支払いはメールにてご案内します。",
      "checkout.name": "お名前",
      "checkout.email": "メール",
      "checkout.phone": "電話番号",
      "checkout.address": "お届け先住所",
      "checkout.submit": "注文を確定する",
      "checkout.done.step": "受付完了",
      "checkout.done.title": "ありがとうございます",
      "checkout.done.note":
        "ご依頼を承りました（{total}）。お支払いと制作日程の確認のため、{email} にご連絡いたします。",
      "checkout.done.home": "ホームへ戻る",
      "stockists.title": "取扱店舗",
      "stockists.intro":
        "Vonloviはオンラインおよび選定されたパートナーでご覧いただけます。取扱いのご相談はお問い合わせください。",
      "stockists.online": "オンラインブティック",
      "stockists.online.text":
        "vonlovi.com から直接ご注文ください — 受注制作、納期3〜5週間。",
      "stockists.beige.name": "Beige Habilleur",
      "stockists.beige.place": "フランス",
      "stockists.beige.text": "ブティック — 86 rue Bonaparte, 75006 Paris.",
      "stockists.envers.name": "L'Envers Showroom",
      "stockists.envers.place": "日本",
      "stockists.envers.text": "ショールーム — 日本.",
      "stockists.paris": "パリ",
      "stockists.paris.text": "ショールームはご予約制です — プライベートビューイングをご希望の方はご連絡ください。",
      "stockists.jura": "ジュラ",
      "stockists.jura.text": "Vonloviの技の中心、ジュラ山脈でカットされる硬石。",
      "stockists.partners": "パートナー",
      "stockists.partners.text":
        "小売店・ギャラリーの方は contact@vonlovi.com まで。ストックリストネットワークへご参加ください。",
      "stockists.contact": "お問い合わせ",
      "shipping.title": "配送",
      "shipping.intro":
        "Vonloviの各ピースは受注制作です（約3〜5週間）。完成後の発送は下記の条件に従います。",
      "shipping.zones.label": "配送エリア",
      "shipping.zones.text":
        "VONLOVIはフランス本土（コルシカ含む）、EU全域、スイス、英国、米国へ配送します。その他の国は contact@vonlovi.com までご連絡ください。",
      "shipping.delay.label": "納期",
      "shipping.delay.text":
        "受注制作：約3〜5週間。ジュエリーが準備でき次第、確認後1〜5営業日で配送予定。準備に1〜2営業日、その後運送会社が集荷します。",
      "shipping.fees.label": "配送業者・料金",
      "shipping.fees.text":
        "DHL — 平日9時〜17時（祝日除く）、約48時間以内。ヨーロッパは無料。米国：50€。",
      "shipping.track.label": "追跡",
      "shipping.track.text":
        "発送時に追跡番号をメールでお知らせします。不在の場合、運送会社が受取方法を記載した不在票を残します。",
      "returns.title": "返品",
      "returns.intro":
        "受取日から14日以内に注文の全部または一部を返品できます。ただしカスタム品（彫刻、サイズ変更など）は対象外です。",
      "returns.terms.label": "条件",
      "returns.terms.text":
        "未使用・元の状態で、タグが付いたまま、元の梱包での返品が必要です。条件を満たさない場合、VONLOVIは返品をお受けできないことがあります。",
      "returns.how.label": "手順",
      "returns.how.text":
        "1. 注文番号と対象商品を明記し contact@vonlovi.com へ。<br />2. カスタマーサービスがメールで返品を確認。<br />3. 元のケースと返品フォームで梱包。<br />4. 承認から14日以内に指定住所へ発送。<br />5. 検品後、1か月以内に返金。",
      "returns.address.label": "返送先",
      "returns.address.text":
        "TEMIS LUXURY France — VONLOVI Service Retours<br />31 rue Blaise Pascal<br />93600 Aulnay-sous-Bois<br />France",
      "returns.fees.label": "費用・返金",
      "returns.fees.text":
        "返送料はお客様負担です。追跡・保険付きでお送りください。返金は商品代金（往路送料を除く）を元の支払い方法へ。交換は不可 — 新規ご注文をお願いします。",
      "care.title": "お手入れ",
      "care.intro":
        "Vonloviのピース（18Kゴールド、硬石、マザーオブパール、ダイヤモンド）の輝きを守るための簡単なアドバイス。",
      "care.contact.label": "香水・化学品",
      "care.contact.text":
        "香水、石鹸、化学品、化粧品との接触は避けてください。素材の色や自然な外観を損なうことがあります。",
      "care.water.label": "水・熱",
      "care.water.text":
        "真水・塩素・海水などの水、また高温（長時間の直射日光）への露出は避けてください。",
      "care.activity.label": "活動時",
      "care.activity.text":
        "スポーツや園芸など、衝撃や製品との接触の恐れがある活動の際はジュエリーを外してください。",
      "care.clean.label": "清掃・保管",
      "care.clean.text":
        "柔らかい乾いた布で定期的に清掃してください。ダイヤモンドは中性液体石鹸と柔らかいブラシで洗い、ぬるま湯ですすぎ、柔らかい布で乾かします。傷を防ぐため、各ピースを元のケースに個別保管してください。",
      "press.title": "プレス",
      "press.intro": "Vonloviのプレス掲載 — セレクション。",
      "press.etiquette.name": "Étiquette Magazine",
      "press.etiquette.place": "フランス",
      "press.etiquette.text": "フランスのÉtiquette Magazineに掲載。",
      "press.them.name": "Them Magazine",
      "press.them.place": "日本",
      "press.them.text": "日本のThem Magazineに掲載。",
      "about.label1": "について",
      "about.p1":
        "VONLOVIは、アーティスト De Rrusie によりパリで創設されたコンテンポラリージュエリーのメゾンです。必要ではなく欲求に応えるブランド — 画家がアートとジュエリーを織りなす、土から生まれた創造。三つの音節 — VON·LO·VI — は音楽性のために選ばれ、謎めいた詩のようであり、常に愛から生きることを思い起こさせるためでもあります。",
      "about.label2": "メゾン",
      "about.p2":
        "アートと絵画の合流点で、Vonloviは三つの地に広がります。ジュラで宝石職人との出会いがあり、硬石はそのカットを得ました。パリが創り、ジュラが削り、ポルトガルが手で仕上げる。すべて受注制作で、3〜5週間を要します。",
      "about.label3": "アーティスト",
      "about.p3":
        "De Rrusie は画家です。キャンバスでは空の広大さと抽象を描き、Vonloviでは貴さへ、無限に小さなもの、繊細さへと近づきます。そこから生まれるジュエリーは身体的で、個人的で、官能的です。",
      "about.label4": "お問い合わせ",
    },
    ko: {
      "nav.shop": "샵",
      "nav.panier": "장바구니",
      "nav.about": "소개",
      "nav.press": "프레스",
      "nav.regards": "Regards",
      "nav.logo": "VONLOVI — 홈",
      "shop.pendentifs": "펜던트",
      "shop.bagues": "반지",
      "shop.boucles": "귀걸이",
      "shop.boutons": "버튼",
      "shop.bracelets": "팔찌",
      "cat.all": "컬렉션",
      "cat.pendentifs": "펜던트",
      "cat.bagues": "반지",
      "cat.boucles": "귀걸이",
      "cat.boutons": "버튼",
      "cat.bracelets": "팔찌",
      "home.hero": "캠페인",
      "home.prev": "이전 이미지",
      "home.next": "다음 이미지",
      "home.cats": "카테고리",
      "home.tile.pendentif": "자개 펜던트",
      "home.tile.bague": "오닉스 반지",
      "home.tile.boucle": "오닉스 귀걸이",
      "home.tile.bouton": "오닉스 버튼",
      "home.edit1.title": "주문 제작",
      "home.edit1.text":
        "모든 작품은 18K 옐로우 골드와 Vonlovi 커팅의 경석으로 주문 제작됩니다. 아틀리에가 한 점 한 점의 정성을 지키기 위해 약 3~5주가 소요됩니다.",
      "home.edit1.cta": "나크르 반지 보기",
      "home.edit2.title": "Vonlovi의 세계",
      "home.edit2.text":
        "Vonlovi는 예술과 공예가 만나는 조각적 주얼리를 만듭니다. De Rrusie의 디자인은 귀금속, 유기적인 라인, 건축적 정밀함의 균형을 이룹니다.",
      "home.edit2.cta": "카넬리안 귀걸이 보기",
      "home.edit3.title": "Regards",
      "home.edit3.text": "Vonlovi의 세계를 비추는 협업자들 — 사진가와 캠페인의 시선.",
      "home.edit3.cta": "Regards 보기",
      "footer.contributors": "Regards",
      "contributors.title": "Regards",
      "contributors.lead": "Vonlovi의 이미지를 만드는 협업자들. 이름을 선택해 갤러리를 열어보세요.",
      "contributors.images": "장",
      "contributors.back": "← Regards",
      "contributors.missing": "찾을 수 없습니다.",
      "contributors.unavailable": "갤러리를 불러올 수 없습니다.",
      "contributors.role.amanda-elise-k": "사진 — 스틸 라이프",
      "contributors.role.stanislas-motz": "사진 — LOOK 캠페인",
      "contributors.role.celia-spenard-ko": "사진 — 캠페인",
      "contributors.role.goldie-williams": "사진 — 캠페인",
      "contributors.role.cyrille-robin": "사진 — 제품 스튜디오",
      "contributors.role.xavier-rosny": "사진 — 캠페인",
      "contributors.role.cristian-hunter": "사진 — 캠페인",
      "contributors.role.maxime-wolff": "사진 — 아카이브",
      "contributors.role.delawhere": "필름 — 캠페인",
      "contributors.role.ls-archives": "아카이브 — 협업",
      "footer.service": "고객 서비스",
      "footer.livraison": "배송",
      "footer.retours": "반품",
      "footer.entretien": "관리",
      "footer.contact": "문의",
      "footer.stockists": "판매처",
      "footer.maison": "Vonlovi",
      "footer.about": "소개",
      "footer.press": "프레스",
      "footer.collection": "컬렉션",
      "footer.newsletter": "뉴스레터",
      "footer.newsletter.text": "신작과 Vonlovi의 세계를 전해 드립니다.",
      "footer.email": "이메일",
      "footer.email.ph": "이메일 주소",
      "footer.send": "보내기",
      "footer.write": "문의",
      "footer.mentions": "법적 고지",
      "footer.cgv": "이용 약관",
      "footer.privacy": "개인정보",
      "footer.email.error": "올바른 주소를 적어 주세요.",
      "cookie.text": "이 집은 방문을 기억합니다.",
      "cookie.ok": "계속",
      "cookie.more": "개인정보",
      "product.add": "장바구니에 담기",
      "product.size": "사이즈",
      "product.size.choose": "사이즈 선택",
      "product.size.guide":
        "유럽 사이즈: 안쪽 둘레(밀리미터). 괄호 안은 손가락 지름입니다.",
      "product.bracelet.length": "길이",
      "product.bracelet.length.choose": "길이 선택",
      "product.bracelet.color": "컬러",
      "product.bracelet.color.choose": "컬러 선택",
      "product.color.noir": "블랙",
      "product.color.bordeaux": "보르도",
      "product.assurances":
        "주문 제작, 3~5주. 옐로우 골드 750/1000, 보증 펀치. DHL 배송. 수령 후 14일 이내 반품(맞춤 제작 제외). <a href=\"shipping.html\">배송</a> · <a href=\"returns.html\">반품</a> · <a href=\"care.html\">관리</a>.",
      "panier.size": "사이즈",
      "product.missing": "상품을 찾을 수 없습니다.",
      "product.unavailable": "카탈로그를 불러올 수 없습니다.",
      "product.loading": "불러오는 중…",
      "collection.empty": "상품이 없습니다.",
      "collection.unavailable": "카탈로그를 불러올 수 없습니다.",
      "panier.step": "장바구니 · 1 / 2",
      "panier.title": "장바구니",
      "panier.back": "← 계속하기",
      "checkout.back": "← 장바구니",
      "panier.empty": "장바구니가 비어 있습니다.",
      "panier.continue": "쇼핑 계속하기",
      "panier.remove": "삭제",
      "panier.total": "합계",
      "panier.checkout": "주문하기",
      "checkout.step": "주문 · 2 / 2",
      "checkout.title": "고객 정보",
      "checkout.note": "모든 작품은 주문 제작입니다(3~5주). 이 양식으로 요청을 접수하며 — 결제는 이메일로 안내드립니다.",
      "checkout.name": "이름",
      "checkout.email": "이메일",
      "checkout.phone": "전화번호",
      "checkout.address": "배송 주소",
      "checkout.submit": "주문 확정",
      "checkout.done.step": "접수 완료",
      "checkout.done.title": "감사합니다",
      "checkout.done.note": "요청이 접수되었습니다({total}). 결제와 제작 일정을 위해 {email}로 연락드리겠습니다.",
      "checkout.done.home": "홈으로 돌아가기",
      "stockists.title": "판매처",
      "stockists.intro": "Vonlovi는 온라인과 선정된 파트너에서 만나볼 수 있습니다. 입점 문의는 연락해 주세요.",
      "stockists.online": "온라인 부티크",
      "stockists.online.text": "vonlovi.com에서 직접 주문하세요 — 주문 제작, 납기 3~5주.",
      "stockists.beige.name": "Beige Habilleur",
      "stockists.beige.place": "프랑스",
      "stockists.beige.text": "부티크 — 86 rue Bonaparte, 75006 Paris.",
      "stockists.envers.name": "L'Envers Showroom",
      "stockists.envers.place": "일본",
      "stockists.envers.text": "쇼룸 — 일본.",
      "stockists.paris": "파리",
      "stockists.paris.text": "쇼룸은 예약제입니다 — 프라이빗 뷰잉을 원하시면 연락해 주세요.",
      "stockists.jura": "쥐라",
      "stockists.jura.text": "Vonlovi 기술의 중심, 쥐라 산맥에서 커팅되는 경석.",
      "stockists.partners": "파트너",
      "stockists.partners.text": "리테일러·갤러리이신가요? contact@vonlovi.com으로 문의해 판매처 네트워크에 참여해 주세요.",
      "stockists.contact": "문의하기",
      "shipping.title": "배송",
      "shipping.intro":
        "모든 Vonlovi 작품은 주문 제작입니다(약 3~5주). 제작 완료 후 아래 조건에 따라 발송됩니다.",
      "shipping.zones.label": "배송 지역",
      "shipping.zones.text":
        "VONLOVI는 프랑스 본토(코르시카 포함), EU 전역, 스위스, 영국, 미국으로 배송합니다. 그 외 국가는 contact@vonlovi.com으로 문의해 주세요.",
      "shipping.delay.label": "기간",
      "shipping.delay.text":
        "주문 제작: 약 3~5주. 주얼리 준비 후 확인일로부터 영업일 1~5일 내 배송 예정. 준비 1~2영업일 후 운송사가 집하합니다.",
      "shipping.fees.label": "운송사·요금",
      "shipping.fees.text":
        "DHL — 평일 9시~17시(공휴일 제외), 약 48시간 이내. 유럽 무료. 미국: 50€.",
      "shipping.track.label": "추적",
      "shipping.track.text":
        "발송 시 추적 번호가 이메일로 안내됩니다. 부재 시 운송사가 수령 방법이 적힌 부재 표를 남깁니다.",
      "returns.title": "반품",
      "returns.intro":
        "수령일로부터 14일 이내에 주문 전부 또는 일부를 반품할 수 있습니다. 맞춤 제작(각인, 사이즈 변경 등)은 제외됩니다.",
      "returns.terms.label": "조건",
      "returns.terms.text":
        "미사용·원래 상태·태그 부착·원래 포장으로 반품해야 합니다. 조건을 충족하지 않으면 VONLOVI가 반품을 거절할 수 있습니다.",
      "returns.how.label": "절차",
      "returns.how.text":
        "1. 주문 번호와 상품을 적어 contact@vonlovi.com으로 연락.<br />2. 고객 서비스가 이메일로 반품 확인.<br />3. 원래 케이스와 반품 양식으로 포장.<br />4. 승인 후 14일 이내 지정 주소로 발송.<br />5. 품질 확인 후 한 달 이내 환불.",
      "returns.address.label": "반품 주소",
      "returns.address.text":
        "TEMIS LUXURY France — VONLOVI Service Retours<br />31 rue Blaise Pascal<br />93600 Aulnay-sous-Bois<br />France",
      "returns.fees.label": "비용·환불",
      "returns.fees.text":
        "반품 배송비는 고객 부담입니다. 추적·보험 포함으로 보내 주세요. 환불은 상품 가격(최초 배송비 제외)을 원래 결제 수단으로. 교환 불가 — 새 주문이 필요합니다.",
      "care.title": "관리",
      "care.intro":
        "Vonlovi 작품(18K 골드, 경석, 자개, 다이아몬드)의 광채를 지키는 간단한 관리법.",
      "care.contact.label": "향수·화학 제품",
      "care.contact.text":
        "향수, 비누, 화학 제품, 화장품과의 접촉을 피하세요. 소재의 색과 자연스러운 외관을 해칠 수 있습니다.",
      "care.water.label": "물·열",
      "care.water.text":
        "민물·염소·바닷물 등 물에 노출하지 말고, 고온(장시간 직사광선)도 피하세요.",
      "care.activity.label": "활동 시",
      "care.activity.text":
        "스포츠, 원예 등 충격이나 제품 접촉이 있을 수 있는 활동 때는 주얼리를 빼 주세요.",
      "care.clean.label": "세척·보관",
      "care.clean.text":
        "부드러운 마른 천으로 정기적으로 닦으세요. 다이아몬드는 중성 액체 비누와 부드러운 브러시로 세척하고 미지근한 물로 헹군 뒤 부드러운 천으로 말리세요. 긁힘을 막으려면 각 작품을 원래 케이스에 따로 보관하세요.",
      "press.title": "프레스",
      "press.intro": "Vonlovi 프레스 — 선정 게재.",
      "press.etiquette.name": "Étiquette Magazine",
      "press.etiquette.place": "프랑스",
      "press.etiquette.text": "프랑스 Étiquette Magazine 게재.",
      "press.them.name": "Them Magazine",
      "press.them.place": "일본",
      "press.them.text": "일본 Them Magazine 게재.",
      "about.label1": "소개",
      "about.p1":
        "VONLOVI는 아티스트 De Rrusie가 파리에서 설립한 컨템포러리 주얼리 메종입니다. 필요보다 욕망에 응답하는 브랜드 — 화가가 예술과 주얼리를 엮어 내는, 땅에서 비롯된 창조. 세 음절 — VON·LO·VI — 은 음악성을 위해 선택되었고, 수수께끼 같은 시처럼, 언제나 사랑으로부터 살라는 상기이기도 합니다.",
      "about.label2": "메종",
      "about.p2":
        "예술과 회화의 합류점에서 Vonlovi는 세 지역에 펼쳐집니다. 쥐라에서 보석 세공사와의 만남이 경석에 커팅을 주었습니다. 파리가 만들고, 쥐라가 깎고, 포르투갈이 손으로 완성합니다. 모두 주문 제작이며 3~5주가 필요합니다.",
      "about.label3": "아티스트",
      "about.p3":
        "De Rrusie는 화가입니다. 캔버스에서는 하늘의 광대함과 추상을 그리고, Vonlovi에서는 귀함으로, 무한히 작은 것, 섬세함으로 다가갑니다. 그로부터 태어나는 주얼리는 신체적이고, 개인적이며, 감각적입니다.",
      "about.label4": "문의"
    },
  };

  function normalize(lang) {
    if (!lang) return DEFAULT;
    const raw = String(lang).toLowerCase().trim();
    if (raw === "jp" || raw === "jap" || raw.startsWith("japan")) return "ja";
    if (raw === "kr" || raw.startsWith("korea")) return "ko";
    const short = raw.slice(0, 2);
    return SUPPORTED.includes(short) ? short : DEFAULT;
  }

  function readStored() {
    try {
      const fromLocal = localStorage.getItem(STORAGE_KEY);
      if (fromLocal && SUPPORTED.includes(normalize(fromLocal))) return normalize(fromLocal);
    } catch {
      /* ignore */
    }
    try {
      const fromSession = sessionStorage.getItem(STORAGE_KEY);
      if (fromSession && SUPPORTED.includes(normalize(fromSession))) return normalize(fromSession);
    } catch {
      /* ignore */
    }
    return null;
  }

  function persist(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }

  function ensureCjkFont(lang) {
    const isJa = lang === "ja";
    const isKo = lang === "ko";
    if (!isJa && !isKo) return;

    if (isJa && !document.getElementById("vonlovi-ja-font")) {
      const link = document.createElement("link");
      link.id = "vonlovi-ja-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400&display=swap";
      document.head.appendChild(link);
    }
    if (isKo && !document.getElementById("vonlovi-ko-font")) {
      const link = document.createElement("link");
      link.id = "vonlovi-ko-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400&display=swap";
      document.head.appendChild(link);
    }

    if (!document.getElementById("vonlovi-cjk-style")) {
      const style = document.createElement("style");
      style.id = "vonlovi-cjk-style";
      style.textContent = `
        html[data-lang="ja"] body,
        html[data-lang="ja"] {
          font-family: "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", "Cormorant Garamond", serif;
        }
        html[data-lang="ko"] body,
        html[data-lang="ko"] {
          font-family: "Noto Serif KR", "Apple SD Gothic Neo", "Malgun Gothic", "Cormorant Garamond", serif;
        }
        html[data-lang="ja"] .site-chrome__link,
        html[data-lang="ja"] .site-shop__trigger,
        html[data-lang="ja"] .site-footer__heading,
        html[data-lang="ja"] .site-footer a,
        html[data-lang="ja"] .home-editorial__title,
        html[data-lang="ja"] .home-editorial__cta,
        html[data-lang="ja"] .home-cats__label,
        html[data-lang="ja"] .about__label,
        html[data-lang="ja"] .contributors__title,
        html[data-lang="ja"] .contributors__name,
        html[data-lang="ko"] .site-chrome__link,
        html[data-lang="ko"] .site-shop__trigger,
        html[data-lang="ko"] .site-footer__heading,
        html[data-lang="ko"] .site-footer a,
        html[data-lang="ko"] .home-editorial__title,
        html[data-lang="ko"] .home-editorial__cta,
        html[data-lang="ko"] .home-cats__label,
        html[data-lang="ko"] .about__label,
        html[data-lang="ko"] .contributors__title,
        html[data-lang="ko"] .contributors__name {
          letter-spacing: 0.06em;
        }
      `;
      document.head.appendChild(style);
    }
  }

  function consumeUrlLang() {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("lang");
      if (!fromUrl) return null;
      const next = normalize(fromUrl);
      if (!SUPPORTED.includes(next)) return null;
      persist(next);
      params.delete("lang");
      const query = params.toString();
      const nextUrl =
        window.location.pathname + (query ? `?${query}` : "") + window.location.hash;
      window.history.replaceState({}, "", nextUrl);
      return next;
    } catch {
      return null;
    }
  }

  function get() {
    return readStored() || DEFAULT;
  }

  function set(lang) {
    const next = normalize(lang);
    persist(next);
    document.documentElement.lang = next;
    document.documentElement.dataset.lang = next;
    ensureCjkFont(next);
    apply(document);
    window.dispatchEvent(new CustomEvent("vonlovi:lang", { detail: next }));
    return next;
  }

  function t(key, lang = get()) {
    const table = dict[normalize(lang)] || dict[DEFAULT];
    return table[key] ?? dict[DEFAULT][key] ?? key;
  }

  function apply(root = document) {
    const lang = get();
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const value = t(key, lang);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
      else el.textContent = value;
    });

    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key, lang));
    });

    root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) el.setAttribute("aria-label", t(key, lang));
    });

    root.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (key) el.setAttribute("alt", t(key, lang));
    });

    root.querySelectorAll("[data-set-lang]").forEach((el) => {
      const code = normalize(el.getAttribute("data-set-lang"));
      const active = code === lang;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function hasChoice() {
    return readStored() !== null;
  }

  function bindLangSwitchers() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-set-lang]");
      if (!btn) return;
      e.preventDefault();
      set(btn.getAttribute("data-set-lang"));
    });
  }

  let productDict = null;
  let productDictPromise = null;

  function loadProducts() {
    if (!productDictPromise) {
      productDictPromise = fetch("/data/products-i18n.json", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : {}))
        .then((data) => {
          productDict = data || {};
          return productDict;
        })
        .catch(() => {
          productDict = {};
          return productDict;
        });
    }
    return productDictPromise;
  }

  function localizeProduct(product, lang = get()) {
    if (!product) return product;
    const code = normalize(lang);
    if (code === "fr") {
      return {
        ...product,
        nom: product.nom,
        famille: product.famille,
        description: product.description,
      };
    }
    const loc = productDict?.[product.slug]?.[code];
    if (!loc) return { ...product };
    return {
      ...product,
      nom: loc.nom || product.nom,
      famille: loc.famille || product.famille,
      description: loc.description || product.description,
    };
  }

  function localizeFamille(famille, lang = get()) {
    if (!famille) return "";
    const code = normalize(lang);
    if (code === "fr") return famille;
    const FAM = {
      en: {
        Bagues: "Rings",
        "Bagues petit modèle": "Small rings",
        "Boucles d'oreilles": "Earrings",
        Boutons: "Buttons",
        Bracelets: "Bracelets",
        Pendentifs: "Pendants",
      },
      ja: {
        Bagues: "リング",
        "Bagues petit modèle": "リング（プチ）",
        "Boucles d'oreilles": "イヤリング",
        Boutons: "ボタン",
        Bracelets: "ブレスレット",
        Pendentifs: "ペンダント",
      },
      ko: {
        Bagues: "반지",
        "Bagues petit modèle": "반지(스몰)",
        "Boucles d'oreilles": "귀걸이",
        Boutons: "버튼",
        Bracelets: "팔찌",
        Pendentifs: "펜던트",
      },
    };
    return FAM[code]?.[famille] || famille;
  }

  /** Root-absolute asset URL so /collection (cleanUrls) does not resolve relative to itself. */
  function assetUrl(path) {
    if (!path) return "";
    let p = String(path).trim().replace(/^\.\//, "");
    if (/^https?:\/\//i.test(p)) return p;
    if (!p.startsWith("/")) p = "/" + p;
    const qIndex = p.indexOf("?");
    const base = qIndex >= 0 ? p.slice(0, qIndex) : p;
    const qs = qIndex >= 0 ? p.slice(qIndex + 1) : "";
    const params = new URLSearchParams(qs);
    if (!params.has("v")) params.set("v", "2");
    return encodeURI(base) + "?" + params.toString();
  }

  function productThumbUrl(localPath) {
    const parts = String(localPath || "")
      .split("/")
      .filter((seg) => seg && seg !== ".");
    if (parts.length < 2) return "";
    const folder = parts[parts.length - 2];
    if (!folder) return "";
    return assetUrl("assets/products/" + folder + ".jpg");
  }

  window.VonloviAsset = { url: assetUrl, thumbUrl: productThumbUrl };

  window.VonloviI18n = {
    get,
    set,
    t,
    apply,
    hasChoice,
    SUPPORTED,
    DEFAULT,
    loadProducts,
    localizeProduct,
    localizeFamille,
  };

  loadProducts();

  function boot() {
    consumeUrlLang();
    ensureCjkFont(get());
    apply(document);
    bindLangSwitchers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
