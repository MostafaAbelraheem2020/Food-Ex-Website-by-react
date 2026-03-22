import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import MyContext from "./MainDataContext";

function MealDesc() {
  const { meals } = useContext(MyContext);
  const { id } = useParams();
  const selectedMeal = meals.find((item) => item.id === parseInt(id));

  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Reset state and scroll to top when meal changes
  useEffect(() => {
    setSpiceLevel("Medium");
    setExtras([]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!selectedMeal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] font-work-sans">
        <p className="text-xl font-semibold text-on-surface-variant">Meal not found</p>
        <Link to="/" className="mt-4 text-primary font-bold hover:underline">Go back to menu</Link>
      </div>
    );
  }

  const toggleExtra = (extra) => {
    setExtras(prev => 
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  return (
    <div key={id} className="bg-background min-h-screen font-work-sans text-on-surface pt-5 animate-product-fade">
      <main className="max-w-7xl mx-auto px-6 py-8 md:py-8">
        {/* Breadcrumb - Compact */}
        <nav className="mb-6 flex items-center space-x-2 text-xs md:text-sm text-on-surface-variant/60">
          <Link to="/" className="hover:text-primary transition-colors">Explore</Link>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span>{selectedMeal.category}</span>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-primary font-medium">{selectedMeal.name}</span>
        </nav>

        {/* Product Hero Section - Rebalanced */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 xl:gap-16 mb-16">
          {/* Image Column */}
          <div className="lg:col-span-5 relative">

              <div 
                className="rounded-4xl overflow-hidden editorial-shadow bg-surface-container-low relative mx-auto lg:mx-0 w-full"
                style={{ height: '100%' }}
              >
                <img
                  src={selectedMeal.img}
                  alt={selectedMeal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-on-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    Popular
                  </span>
                </div>
              </div>
              {/* Overlapping Badge - Scaled Down */}
              <div className="absolute -bottom-5 -right-2 md:right-4 bg-surface-container-lowest p-4 rounded-xl editorial-shadow flex items-center space-x-3">
                <div className="bg-primary-container text-on-primary w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined fill-1 text-[14px]">verified</span>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">Chef's Choice</p>
                  <p className="text-[11px] font-medium leading-none">Curated Daily</p>
                </div>
              </div>
      
          </div>

          {/* Details Column - Optimized Spacing */}
          <div className="lg:col-span-6 flex flex-col justify-start mt-6 lg:mt-0 lg:pl-4">
            <div className="mb-5">
              <div className="flex items-center space-x-1 text-secondary mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-[14px] fill-1">
                    {star <= 4 ? "star" : "star_half"}
                  </span>
                ))}
                <span className="text-on-surface-variant text-xs font-medium ml-2">
                  4.8 ({selectedMeal.rate} Reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-plus-jakarta font-extrabold text-on-surface leading-[1.15] mb-3">
                {selectedMeal.name}
              </h1>
              <p className="text-base text-on-surface-variant font-normal leading-relaxed max-w-lg">
                {selectedMeal.description}
              </p>
            </div>

            {/* Pricing - Slimmer */}
            <div className="bg-surface-container-low p-4 rounded-xl mb-6 flex items-baseline space-x-3">
              <span className="text-2xl font-bold text-primary">${selectedMeal.price}</span>
              <span className="text-on-surface-variant/40 line-through text-sm">${(selectedMeal.price * 1.25).toFixed(2)}</span>
              <span className="bg-secondary-container/20 text-secondary px-2 py-0.5 rounded text-[10px] font-bold">SALE -25%</span>
            </div>

            {/* Customization Options - Compact Grid */}
            <div className="space-y-6 mb-8">
              {/* Spice Level */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/80 mb-3">Spice Intensity</h3>
                <div className="flex flex-wrap gap-2">
                  {["Mild", "Medium", "Hot"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiceLevel(level)}
                      className={`px-5 py-1.5 rounded-lg transition-all text-xs font-bold ${
                        spiceLevel === level
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-surface-container-highest/50 text-on-surface hover:bg-surface-container-highest"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras - Grid Layout */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant/80 mb-3">Enhance Your Plate</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Extra Lemon Sauce", price: 2.5 },
                    { name: "Garlic Crust", price: 1.75 },
                  ].map((extra) => (
                    <label
                      key={extra.name}
                      className={`flex items-center justify-between p-3 rounded-lg border-[1.5px] transition-all cursor-pointer group ${
                        extras.includes(extra.name) 
                          ? "bg-primary/5 border-primary" 
                          : "bg-surface-container-lowest border-transparent hover:border-surface-container-highest"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={extras.includes(extra.name)}
                          onChange={() => toggleExtra(extra.name)}
                          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20"
                        />
                        <span className="text-xs font-semibold">{extra.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-primary/80">+${extra.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity & Summary */}
              <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-xl border border-surface-container-low">
                <div className="flex items-center bg-surface-container-high/50 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-surface-container-lowest transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="px-4 font-bold text-base w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-on-surface-variant font-medium">Estimate Total</p>
                  <p className="text-lg font-bold text-primary">${(selectedMeal.price * quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Premium Feel */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-primary text-on-primary py-3.5 rounded-xl font-plus-jakarta font-bold text-base shadow-xl shadow-primary/20 hover:opacity-95 active:scale-95 transition-all">
                Buy Now
              </button>
              <button className="bg-surface-container-highest text-on-surface py-3.5 rounded-xl font-plus-jakarta font-bold text-base hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center space-x-2">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations - Refined Cards */}
        <section className="mt-20 border-t border-surface-container-low pt-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">The Curator Recommends</span>
              <h2 className="text-2xl font-plus-jakarta font-extrabold">You Might Also Like</h2>
            </div>
            <Link to="/" className="text-primary font-bold text-xs flex items-center space-x-1 group">
              <span>View Full Menu</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.slice(0, 3).map((meal) => (
              <Link key={meal.id} to={`/dish/${meal.id}`} className="bg-surface-container-lowest rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-transform duration-300 group editorial-shadow">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur shadow-sm px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <span className="material-symbols-outlined text-secondary text-[12px] fill-1">star</span>
                    <span className="text-[10px] font-bold">4.8</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold mb-3">{meal.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-base">${meal.price}</span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default MealDesc;
