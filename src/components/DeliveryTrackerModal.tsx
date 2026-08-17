import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Compass, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Star, 
  AlertCircle, 
  Navigation, 
  Send,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Search,
  Package,
  Layers,
  ChevronRight
} from 'lucide-react';
import L from 'leaflet';
import { INITIAL_SAMPLE_ORDER } from '../data/mockData';

export const DeliveryTrackerModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    activeOrder: contextActiveOrder, 
    orders, 
    products, 
    openTrackProduct,
    openTrackOrder 
  } = useApp();

  const activeOrder = contextActiveOrder || (orders.length > 0 ? orders[0] : INITIAL_SAMPLE_ORDER);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const courierMarkerRef = useRef<L.Marker | null>(null);

  // Search & Quick Switcher
  const [trackerSearchInput, setTrackerSearchInput] = useState('');
  const [isSearchingProduct, setIsSearchingProduct] = useState(false);

  // Driver communication simulations
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'driver', text: "Hello! I have picked up your package and I'm currently en route on the express corridor. See you shortly!", time: '2 mins ago' }
  ]);

  // Dynamic courier simulation state
  const [routeProgressIndex, setRouteProgressIndex] = useState(2);
  const [isSimulatingMove, setIsSimulatingMove] = useState(true);
  const [simSpeed, setSimSpeed] = useState<1 | 2 | 4>(1);

  // If modal is not active, return null
  if (activeModal !== 'delivery_tracker') return null;

  const driver = activeOrder.driver || {
    id: 'drv-default',
    name: 'Marcus Sterling',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 789-3321',
    vehicleType: 'Electric Scooter',
    vehiclePlate: 'NY-EV-9428',
    rating: 4.94,
    completedDeliveries: 1840
  };

  const routeCoordinates = activeOrder.routePath || [
    [40.758896, -73.985130],
    [40.757100, -73.985180],
    [40.755200, -73.985220],
    [40.753500, -73.985250],
    [40.751200, -73.985330],
    [40.748817, -73.985428]
  ];

  // Leaflet Map Initialization & Rendering
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance before recreation
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const startLoc = activeOrder.storeLocation || { lat: 40.758896, lng: -73.985130 };
    const destLoc = activeOrder.customerLocation || { lat: 40.748817, lng: -73.985428 };
    const centerLat = (startLoc.lat + destLoc.lat) / 2;
    const centerLng = (startLoc.lng + destLoc.lng) / 2;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 14,
      zoomControl: true
    });

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Custom HTML Icons
    const warehouseIcon = L.divIcon({
      className: 'custom-warehouse-pin',
      html: `
        <div style="background-color: #0f172a; color: white; padding: 6px 10px; border-radius: 12px; font-weight: bold; font-size: 11px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white;">
          <span>🏬 Store Hub</span>
        </div>
      `,
      iconSize: [90, 32],
      iconAnchor: [45, 16]
    });

    const destinationIcon = L.divIcon({
      className: 'custom-dest-pin',
      html: `
        <div style="background-color: #4f46e5; color: white; padding: 6px 10px; border-radius: 12px; font-weight: bold; font-size: 11px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4); border: 2px solid white;">
          <span>📍 Delivery Home</span>
        </div>
      `,
      iconSize: [110, 32],
      iconAnchor: [55, 16]
    });

    const courierIcon = L.divIcon({
      className: 'custom-courier-pin',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 36px; height: 36px; background: rgba(16, 185, 129, 0.35); border-radius: 50%; animation: pulse-ring 1.8s infinite;"></div>
          <div style="background-color: #059669; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 4px 10px rgba(5, 150, 105, 0.5); z-index: 10;">
            🛵
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    // Add Markers
    L.marker([startLoc.lat, startLoc.lng], { icon: warehouseIcon }).addTo(map);
    L.marker([destLoc.lat, destLoc.lng], { icon: destinationIcon }).addTo(map);

    // Initial courier marker
    const currentCoords = routeCoordinates[Math.min(routeProgressIndex, routeCoordinates.length - 1)];
    const courierMarker = L.marker(currentCoords, { icon: courierIcon }).addTo(map);
    courierMarkerRef.current = courierMarker;

    // Add Route Polyline
    L.polyline(routeCoordinates as [number, number][], {
      color: '#4f46e5',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
      lineCap: 'round'
    }).addTo(map);

    // Fit map bounds
    map.fitBounds([
      [startLoc.lat, startLoc.lng],
      [destLoc.lat, destLoc.lng]
    ], { padding: [50, 50] });

    mapInstanceRef.current = map;

    // Force map tile calculation once modal container layout settles
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [activeOrder]);

  // Live courier movement interval simulation with speed modifier
  useEffect(() => {
    if (!isSimulatingMove) return;

    const intervalMs = Math.max(1000, 4000 / simSpeed);

    const interval = setInterval(() => {
      setRouteProgressIndex((prev) => {
        const next = prev < routeCoordinates.length - 1 ? prev + 1 : 0;
        const newCoords = routeCoordinates[next];
        if (courierMarkerRef.current) {
          courierMarkerRef.current.setLatLng(newCoords as [number, number]);
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isSimulatingMove, routeCoordinates, simSpeed]);

  const handleStepForward = () => {
    setRouteProgressIndex((prev) => {
      const next = (prev + 1) % routeCoordinates.length;
      if (courierMarkerRef.current) {
        courierMarkerRef.current.setLatLng(routeCoordinates[next] as [number, number]);
      }
      return next;
    });
  };

  const handleResetPosition = () => {
    setRouteProgressIndex(0);
    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng(routeCoordinates[0] as [number, number]);
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = { sender: 'user', text: chatInput.trim(), time: 'Just now' };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Driver auto-reply simulation
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'driver',
          text: "Got it! Thanks for letting me know. I will follow your instructions upon arrival.",
          time: 'Just now'
        }
      ]);
    }, 1500);
  };

  const matchingProducts = trackerSearchInput.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(trackerSearchInput.toLowerCase()) ||
        p.brand.toLowerCase().includes(trackerSearchInput.toLowerCase()) ||
        p.id.toLowerCase().includes(trackerSearchInput.toLowerCase())
      ).slice(0, 5)
    : [];

  const calculatedDistance = Math.max(0.1, (1 - routeProgressIndex / routeCoordinates.length) * 1.4).toFixed(1);
  const calculatedEtaMinutes = Math.max(2, Math.round((1 - routeProgressIndex / routeCoordinates.length) * 18));
  const currentSpeedMph = isSimulatingMove ? Math.round(22 * simSpeed) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                  Live Product & Courier GPS Tracking
                </h3>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Tracking: <strong className="text-slate-700">{activeOrder.orderNumber}</strong> • Real-time OpenStreetMap Route Telemetry
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Product & Tracking Code Search Bar */}
        <div className="bg-slate-100/80 px-6 py-3 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={trackerSearchInput}
                onChange={(e) => setTrackerSearchInput(e.target.value)}
                onFocus={() => setIsSearchingProduct(true)}
                placeholder="Track any product or enter tracking code (e.g. iPhone, TRK-9921)..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-2xs"
              />
              {trackerSearchInput && (
                <button
                  onClick={() => {
                    setTrackerSearchInput('');
                    setIsSearchingProduct(false);
                  }}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {isSearchingProduct && trackerSearchInput.trim() && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 divide-y divide-slate-100 max-h-56 overflow-y-auto">
                <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
                  Select Product to Track Live
                </div>
                {matchingProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      openTrackProduct(p);
                      setTrackerSearchInput('');
                      setIsSearchingProduct(false);
                    }}
                    className="flex items-center justify-between p-2 hover:bg-indigo-50/70 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-md object-cover bg-slate-100"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">{p.name}</span>
                        <span className="text-[10px] text-slate-400">{p.seller.name} • Hub: {p.hubLocation || 'NYC'}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Track Route
                    </span>
                  </div>
                ))}

                {/* Direct Tracking ID Option */}
                <div
                  onClick={() => {
                    openTrackProduct(trackerSearchInput.trim());
                    setTrackerSearchInput('');
                    setIsSearchingProduct(false);
                  }}
                  className="p-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2 text-xs font-bold text-indigo-600"
                >
                  <Package className="w-4 h-4" />
                  <span>Track exact code "{trackerSearchInput}"</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Select Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap hidden lg:inline">
              Quick Track:
            </span>
            {products.slice(0, 3).map((prod) => (
              <button
                key={prod.id}
                onClick={() => openTrackProduct(prod)}
                className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  activeOrder.items[0]?.productId === prod.id
                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                <span>{prod.name.split(' ')[0]} {prod.name.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Map (Left) & Timeline/Driver (Right) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Interactive Leaflet OpenStreetMap Container (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md h-[340px] sm:h-[420px] bg-slate-100">
                {/* Leaflet Map DOM Element */}
                <div ref={mapContainerRef} className="w-full h-full" id="live-leaflet-map" />

                {/* Floating Live Telemetry HUD Card on Map */}
                <div className="absolute top-3 left-3 right-3 sm:right-auto bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-slate-700/80 shadow-lg z-20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      🛵
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                          Live Courier Telemetry
                        </span>
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono font-bold">
                          {currentSpeedMph} MPH
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white block mt-0.5">
                        {calculatedDistance} miles away • ETA {calculatedEtaMinutes} mins
                      </span>
                    </div>
                  </div>

                  {/* Play / Pause / Step Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsSimulatingMove(!isSimulatingMove)}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/10 transition-colors"
                      title={isSimulatingMove ? "Pause Courier Movement" : "Resume Courier Movement"}
                    >
                      {isSimulatingMove ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    <button
                      onClick={handleStepForward}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/10 transition-colors"
                      title="Step Forward on Route"
                    >
                      <FastForward className="w-3.5 h-3.5 text-indigo-300" />
                    </button>

                    <button
                      onClick={handleResetPosition}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/10 transition-colors"
                      title="Reset Courier to Store Hub"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* Speed Multiplier Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-xl text-[11px] flex items-center gap-2 z-20 border border-slate-700 shadow-md">
                  <span className="text-slate-400 font-semibold">Sim Speed:</span>
                  <div className="flex items-center gap-1">
                    {([1, 2, 4] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setSimSpeed(spd)}
                        className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                          simSpeed === spd ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Driver Profile Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{driver.name}</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        Assigned Courier
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-current" /> {driver.rating}
                      </span>
                      <span>•</span>
                      <span>{driver.vehicleType} ({driver.vehiclePlate})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setChatModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Chat</span>
                  </button>

                  <button
                    onClick={() => setCallModalOpen(true)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Driver</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Milestone Timeline Checkpoints (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="font-bold text-sm text-slate-900">Delivery Milestones</h4>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    In Progress
                  </span>
                </div>

                {/* Checkpoints Timeline */}
                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {activeOrder.checkpoints.map((cp, idx) => (
                    <div key={cp.id} className="relative flex items-start gap-3.5 pl-1">
                      {/* Status Icon */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 flex-shrink-0 text-xs font-bold ${
                        cp.completed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                          : cp.current
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse'
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {cp.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : cp.current ? (
                          <Truck className="w-3.5 h-3.5" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs font-bold ${cp.current ? 'text-indigo-600' : 'text-slate-900'}`}>
                            {cp.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-mono">{cp.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {cp.description}
                        </p>
                        <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                          📍 {cp.locationName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Package Summary Box */}
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Package Contents ({activeOrder.items.length})
                  </span>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {activeOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 text-xs bg-white p-2 rounded-xl border border-slate-200">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-slate-100"
                        />
                        <div className="flex-1 truncate">
                          <span className="font-bold text-slate-800 truncate block">{item.product.name}</span>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span className="text-indigo-600 font-bold">${item.unitPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {activeOrder.notes && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-900">
                    <span className="font-bold block text-[11px]">Doorstep Note for Driver:</span>
                    <p className="mt-0.5 text-amber-800 text-[11px]">{activeOrder.notes}</p>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Estimated arrival: <strong className="text-slate-800">{activeOrder.estimatedDeliveryDate}</strong>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Close Tracking
            </button>
          </div>
        </div>

      </div>

      {/* Call Simulation Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-150">
            <img
              src={driver.photo}
              alt={driver.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-emerald-500/40 animate-pulse"
            />
            <div>
              <h4 className="font-bold text-lg">{driver.name}</h4>
              <p className="text-xs text-emerald-400 font-mono mt-1">Connecting to {driver.phone}...</p>
            </div>
            <p className="text-xs text-slate-400">
              "Hi there! I am currently approaching 6th Avenue with your package and will ring the bell in ~{calculatedEtaMinutes} minutes."
            </p>
            <button
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Chat Simulation Modal */}
      {chatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col h-[480px] animate-in zoom-in-95 duration-150">
            {/* Chat Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={driver.photo}
                  alt={driver.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <h5 className="font-bold text-xs">{driver.name}</h5>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Online En Route
                  </span>
                </div>
              </div>
              <button
                onClick={() => setChatModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message driver (e.g. gate code #401)..."
                className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
