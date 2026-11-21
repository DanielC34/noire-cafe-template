import {useState} from 'react';
import {Navbar} from './components/Navbar';
import {Hero} from './components/Hero';
import {MenuSection} from './components/MenuSection';
import {StorySection} from './components/StorySection';
import {ExperienceSection} from './components/ExperienceSection';
import {GallerySection} from './components/GallerySection';
import {VisitSection} from './components/VisitSection';
import {Footer} from './components/Footer';
import {ItemDetailModal} from './components/ItemDetailModal';
import {BagLineItem, PickupBagDrawer} from './components/PickupBagDrawer';
import {MenuItem} from './data/noireData';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [bagItems, setBagItems] = useState<BagLineItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);

  const handleScrollToReserve = () => {
    const visitEl = document.getElementById('visit');
    if (visitEl) {
      visitEl.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleAddToBag = (item: MenuItem) => {
    setBagItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? {...entry, quantity: entry.quantity + 1}
            : entry,
        );
      }
      return [...prev, {item, quantity: 1}];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id
            ? {...entry, quantity: entry.quantity + delta}
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  };

  return (
    <div className="min-h-screen bg-[#152615] text-[#FFFBF5]">
      <Navbar onReserveClick={handleScrollToReserve} />

      <main>
        <Hero onReserveClick={handleScrollToReserve} />

        <MenuSection
          onSelectItem={setSelectedItem}
          onQuickAdd={handleAddToBag}
          onReserveClick={handleScrollToReserve}
        />

        <StorySection />

        <ExperienceSection />

        <GallerySection />

        <VisitSection />
      </main>

      <Footer />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToBag={handleAddToBag}
      />

      <PickupBagDrawer
        items={bagItems}
        isOpen={bagOpen}
        onOpenChange={setBagOpen}
        onUpdateQty={handleUpdateQty}
        onClearBag={() => setBagItems([])}
      />
    </div>
  );
}
