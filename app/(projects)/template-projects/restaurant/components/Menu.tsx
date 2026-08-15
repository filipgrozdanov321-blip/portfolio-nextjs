"use client";

import { useState } from "react";
import "../styles/RestaurantMenu.css";

const MENU_TABS = ["Starters", "Mains", "Desserts", "Wine", "Cocktails"] as const;
type MenuTab = (typeof MENU_TABS)[number];

const MENU_ITEMS: Record<MenuTab, { name: string; description: string; price: string; tag?: string }[]> = {
  Starters: [
    { name: "Bruschetta al Pomodoro", description: "Toasted sourdough, heritage tomatoes, fresh basil, aged balsamic", price: "$14", tag: "Vegan" },
    { name: "Burrata e Prosciutto", description: "Creamy burrata, San Daniele prosciutto, fig jam, rocket leaves", price: "$18" },
    { name: "Calamari Fritti", description: "Crispy fried squid, lemon aioli, marinara dipping sauce", price: "$16" },
    { name: "Zuppa di Funghi", description: "Wild mushroom soup, truffle oil, toasted ciabatta croutons", price: "$13", tag: "Vegetarian" },
    { name: "Carpaccio di Manzo", description: "Thinly sliced beef, shaved parmesan, capers, lemon dressing", price: "$19" },
    { name: "Polpette al Sugo", description: "Slow-braised veal meatballs, San Marzano tomato, torn basil", price: "$17" },
    { name: "Insalata Caprese", description: "Buffalo mozzarella, heirloom tomatoes, fresh basil, extra virgin olive oil", price: "$15", tag: "Vegetarian" },
    { name: "Cozze al Vino Bianco", description: "Steamed black mussels, white wine, garlic, chilli, grilled focaccia", price: "$19" },
  ],
  Mains: [
    { name: "Tagliatelle al Ragù", description: "Hand-rolled egg pasta, slow-cooked Bolognese, parmesan", price: "$28" },
    { name: "Branzino al Forno", description: "Oven-roasted sea bass, caponata, lemon caper butter", price: "$36" },
    { name: "Osso Buco Milanese", description: "Braised veal shank, saffron risotto, gremolata", price: "$42" },
    { name: "Risotto ai Funghi Porcini", description: "Arborio rice, porcini mushrooms, white wine, aged parmesan", price: "$26", tag: "Vegetarian" },
    { name: "Pollo alla Parmigiana", description: "Breaded chicken breast, tomato sugo, melted fior di latte", price: "$30" },
    { name: "Salmone in Crosta", description: "Herb-crusted Atlantic salmon, cannellini purée, salsa verde", price: "$34" },
    { name: "Bistecca alla Fiorentina", description: "28-day dry-aged T-bone, rosemary roasted potatoes, chimichurri", price: "$58", tag: "Chef's Pick" },
    { name: "Gnocchi al Gorgonzola", description: "Hand-rolled potato gnocchi, gorgonzola cream, toasted walnuts, pear", price: "$27", tag: "Vegetarian" },
    { name: "Agnello al Forno", description: "Slow-roasted lamb shoulder, roasted root vegetables, rosemary jus", price: "$44" },
    { name: "Pappardelle al Cinghiale", description: "Wide ribbon pasta, wild boar ragù, pecorino, fresh herbs", price: "$32" },
  ],
  Desserts: [
    { name: "Tiramisù della Casa", description: "House recipe, Marsala-soaked savoiardi, mascarpone cream", price: "$12", tag: "House Special" },
    { name: "Panna Cotta", description: "Vanilla bean cream, wild berry compote, mint", price: "$11", tag: "Vegetarian" },
    { name: "Cannolo Siciliano", description: "Crispy shell, ricotta cream, candied orange peel, pistachios", price: "$13" },
    { name: "Tortino al Cioccolato", description: "Warm dark chocolate fondant, vanilla gelato, cocoa dust", price: "$14" },
    { name: "Gelato Artigianale", description: "Three scoops of seasonal house-made gelato, waffle cone", price: "$10", tag: "Vegetarian" },
    { name: "Crostata di Limone", description: "Amalfi lemon tart, Italian meringue, candied lemon zest", price: "$12" },
    { name: "Affogato al Caffè", description: "Double espresso poured over fior di latte gelato, amaretti crumble", price: "$11" },
    { name: "Torta della Nonna", description: "Pine nut and ricotta tart, custard cream, powdered sugar", price: "$13", tag: "Vegetarian" },
  ],
  Wine: [
    { name: "Barolo 2018", description: "Giacomo Conterno, Piedmont — full-bodied, cherry, tar, roses", price: "$22", tag: "Red · Glass" },
    { name: "Barolo 2018", description: "Giacomo Conterno, Piedmont — full-bodied, cherry, tar, roses", price: "$95", tag: "Red · Bottle" },
    { name: "Amarone della Valpolicella", description: "Bertani, Veneto — rich, dried fruit, chocolate, tobacco", price: "$26", tag: "Red · Glass" },
    { name: "Amarone della Valpolicella", description: "Bertani, Veneto — rich, dried fruit, chocolate, tobacco", price: "$110", tag: "Red · Bottle" },
    { name: "Chianti Classico Riserva", description: "Castello di Ama, Tuscany — earthy, leather, dark cherry", price: "$18", tag: "Red · Glass" },
    { name: "Pinot Grigio delle Venezie", description: "Santa Margherita, Veneto — crisp, citrus, mineral finish", price: "$14", tag: "White · Glass" },
    { name: "Pinot Grigio delle Venezie", description: "Santa Margherita, Veneto — crisp, citrus, mineral finish", price: "$58", tag: "White · Bottle" },
    { name: "Gavi di Gavi", description: "La Scolca, Piedmont — elegant, floral, green apple, almond", price: "$16", tag: "White · Glass" },
    { name: "Soave Classico", description: "Pieropan, Veneto — light, honeyed, peach, mineral", price: "$13", tag: "White · Glass" },
    { name: "Prosecco di Valdobbiadene", description: "Ruggeri, Veneto — fine bubbles, pear, white flowers", price: "$12", tag: "Sparkling · Glass" },
    { name: "Franciacorta Brut", description: "Bellavista, Lombardy — toasty, citrus, brioche", price: "$19", tag: "Sparkling · Glass" },
  ],
  Cocktails: [
    { name: "Aperol Spritz", description: "Aperol, Prosecco, soda water, orange slice", price: "$14" },
    { name: "Negroni", description: "Campari, sweet vermouth, gin, orange peel", price: "$16" },
    { name: "Bellini", description: "White peach purée, Prosecco", price: "$13" },
    { name: "Limoncello Sour", description: "House limoncello, lemon juice, egg white, prosecco float", price: "$15" },
    { name: "Rossini", description: "Fresh strawberry purée, Prosecco, splash of raspberry liqueur", price: "$14" },
    { name: "Americano", description: "Campari, sweet vermouth, soda water, orange twist", price: "$13" },
    { name: "Espresso Martini", description: "Vodka, Kahlúa, double espresso, coffee beans", price: "$17" },
    { name: "San Pellegrino", description: "750ml sparkling mineral water", price: "$7" },
    { name: "Espresso", description: "Double shot, house blend", price: "$5" },
    { name: "Caffè Macchiato", description: "Espresso, dash of steamed milk", price: "$6" },
  ],
};

export default function RestaurantMenu() {
  const [activeTab, setActiveTab] = useState<MenuTab>("Starters");

  return (
    <section id="restaurant-menu" className="restaurant-menu">
      <div className="restaurant-menu-inner">

        <div className="restaurant-menu-header">
          <p className="restaurant-menu-eyebrow">What We Serve</p>
          <h2 className="restaurant-menu-title">Our Menu</h2>
        </div>

        <div className="restaurant-menu-tabs">
          {MENU_TABS.map((tab) => (
            <button
              key={tab}
              className={`restaurant-menu-tab ${activeTab === tab ? "restaurant-menu-tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="restaurant-menu-list">
          {MENU_ITEMS[activeTab].map((item, index) => (
            <div key={`${item.name}-${index}`} className="restaurant-menu-item">
              <div className="restaurant-menu-item-left">
                <div className="restaurant-menu-item-name-row">
                  <span className="restaurant-menu-item-name">{item.name}</span>
                  {item.tag && (
                    <span className="restaurant-menu-item-tag">{item.tag}</span>
                  )}
                </div>
                <span className="restaurant-menu-item-description">{item.description}</span>
              </div>
              <span className="restaurant-menu-item-dots" aria-hidden="true" />
              <span className="restaurant-menu-item-price">{item.price}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}