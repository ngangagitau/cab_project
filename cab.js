import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [availableCabs, setAvailableCabs] = useState([]);
  const [selectedCab, setSelectedCab] = useState(null);
  const [offerPrice, setOfferPrice] = useState('');
  const [driverResponse, setDriverResponse] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [driverRating, setDriverRating] = useState(0);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch available cabs when user location is set
    if (userLocation) {
      fetchAvailableCabs();
    }
  }, [userLocation]);

  const fetchAvailableCabs = async () => {
    // This would be an API call in a real application
    const mockCabs = [
      { id: 1, name: 'Cab 1', price: 20, distance: 0.5 },
      { id: 2, name: 'Cab 2', price: 25, distance: 0.7 },
      { id: 3, name: 'Cab 3', price: 18, distance: 1.0 },
    ];
    setAvailableCabs(mockCabs);
  };

  const handleCabSelection = (cab) => {
    setSelectedCab(cab);
  };

  const handleBargain = () => {
    // This would be an API call in a real application
    const mockResponse = Math.random() > 0.5 ? 'accepted' : 'rejected';
    setDriverResponse(mockResponse);
  };

  const handleRating = (rating, isDriver) => {
    if (isDriver) {
      setDriverRating(rating);
    } else {
      setUserRating(rating);
    }
    // This would be an API call to save the rating in a real application
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cab Booking App</title>
        <meta name="description" content="Book a cab and bargain prices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cab Booking App</h1>

        {!userLocation && <p>Loading your location...</p>}

        {userLocation && (
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Available Cabs</h2>
              {availableCabs.map((cab) => (
                <div key={cab.id} onClick={() => handleCabSelection(cab)}>
                  <p>{cab.name} - ${cab.price} ({cab.distance} miles away)</p>
                </div>
              ))}
            </div>

            {selectedCab && (
              <div className={styles.card}>
                <h2>Selected Cab: {selectedCab.name}</h2>
                <p>Original Price: ${selectedCab.price}</p>
                <input
                  type="number"
                  placeholder="Enter your offer"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
                <button onClick={handleBargain}>Submit Offer</button>
                {driverResponse && (
                  <p>Driver {driverResponse} your offer.</p>
                )}
              </div>
            )}

            <div className={styles.card}>
              <h2>Rate Your Experience</h2>
              <div>
                <p>Rate the driver:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(star, true)}
                    style={{ cursor: 'pointer' }}
                  >
                    {star <= driverRating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <div>
                <p>Driver's rating for you:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= userRating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
