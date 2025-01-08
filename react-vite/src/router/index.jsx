import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';
import PokedexPage from '../components/PokedexPage/PokedexPage';
import UserAccountPage from '../components/UserAccountPage/UserAccountPage';
import UpdateAccountPage from '../components/UpdateAccountPage.jsx';
import UserProfilePage from '../components/UserProfilePage/index.js';
import PokemonDetailsPage from '../components/PokemonDetailsPage/PokemonDetailsPage.jsx';
import UserJournalPage from '../components/UserJournalPage/UserJournalPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/pokedex',
    element: <PokedexPage />
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetailsPage />
  },
  {
    path: '/user/:id/profile',
    element: <UserProfilePage />
  },
  {
    path: '/journal/user',
    element: <UserJournalPage />
  },
  {
    path: '/account',
    element: <UserAccountPage />
  },
  {
    path: '/account/update',
    element: <UpdateAccountPage />
  }
]);
