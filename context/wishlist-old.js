import { createContext, useContext, useMemo, useState } from 'react';
const WishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  let wishlistFromStorage;
  let wishlist = [];
  if (typeof window !== 'undefined') {
    wishlistFromStorage = JSON.parse(window.localStorage.getItem('movies/wishlist'));
    if (wishlistFromStorage) {
      wishlist = wishlistFromStorage.wishlist;
    }
  }
  const [wishlistState, setWishlistState] = useState({
    wishlist: wishlist
  });

  const setWishlist = newWishlist => {
    const tempWishlist = wishlistState;
    tempWishlist.wishlist.push(newWishlist);

    setWishlistState(tempWishlist.wishlist);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('movies/wishlist', JSON.stringify(wishlistState));
    }
  };

  const removeWishlist = item => {
    let index
    for (let i = 0; i < wishlistState.wishlist.length; i++) {
      const wishlist = wishlistState.wishlist[i];

      if (wishlist.imdbRating === item.imdbRating) {
        index = i;
        break;
      }
    }

    wishlistState.wishlist.splice(index, 1);
    setWishlistState(wishlistState.wishlist);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('movies/wishlist', JSON.stringify(wishlistState));
    }

  }

  const actions = useMemo(
    () => ({
      setWishlist,
      removeWishlist
    }),
    [
      setWishlist,
      removeWishlist
    ]
  );

  const contextValue = useMemo(() => [wishlistState, actions], [
    wishlistState,
    actions
  ]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  return useContext(WishlistContext);
}
