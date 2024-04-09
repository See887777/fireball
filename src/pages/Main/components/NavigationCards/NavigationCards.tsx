import { NavLink } from 'react-router-dom';

import { Link } from '@mui/material';

import classNames from 'classnames';

import { useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { NavRoute } from 'shared/models';

import { LootSurvivorIcon, PirateNationsIcon, PrimodiumCardIcon } from 'components/Icons/Icons';

import { navRoutes } from 'data/nav-routes.data';

import { styles } from './styles';

export function NavigationCards() {
  const classes = styles();

  const activeAddress = useAppSelector(fromLoginStore.getActiveAddress);
  const clientLink = activeAddress ? `/client/${activeAddress}/gotchis` : 'client';

  return (
    <div className={classes.navContainer}>
      <div className={classes.navInner}>
        {navRoutes.map((route: NavRoute, index: number) => (
          <NavLink
            to={route.name === 'client' ? clientLink : route.path ? route.path : route.name}
            className={classes.navCard}
            key={index}
          >
            <div className={classes.navCardImage}>
              {route.icon}
              <div className={classes.navCardName}>{route.name}</div>
            </div>
            {route.description && <div className={classes.navCardDescr}>{route.description}</div>}
          </NavLink>
        ))}
        <Link href='https://www.primodium.com/' target='_blank' className={classes.navCard}>
          <div className={classes.navCardImage}>
            <PrimodiumCardIcon />
            <div className={classes.navCardName}>Primodium</div>
          </div>
          <div className={classes.navCardDescr}>autonomous world rts built with mud</div>
        </Link>
        <Link href='https://piratenation.game/' target='_blank' className={classes.navCard}>
          <div className={classes.navCardImage}>
            <PirateNationsIcon />
            <div className={classes.navCardName}>Pirate Nations</div>
          </div>
          <div className={classes.navCardDescr}>high seas adventures, treasures and fun</div>
        </Link>
        <Link href='/' target='_blank' className={classNames(classes.navCard, 'disabled')}>
          <div className={classes.navCardImage}>
            <LootSurvivorIcon />
            <div className={classes.navCardName}>Loot Survivor</div>
          </div>
          <div className={classes.soon}>
            <span>coming soon...</span>
          </div>
          <div className={classes.navCardDescr}>play2die adventure</div>
        </Link>
      </div>
    </div>
  );
}
