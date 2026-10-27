'use client';
import { useLang } from '@/lib/i18n';
import { site } from '@/content/site';
import { useTyreFilter } from '@/lib/filter';
import Pic from './Pic';
import { IconArrow } from './Icons';

/** "What do you drive?" — photo tiles that jump to the tyre grid pre-filtered. */
export default function Vehicles() {
  const { t } = useLang();
  const [, setVehicle] = useTyreFilter();

  return (
    <section className="sec" aria-labelledby="veh-title">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow">{t.vehicles.label}</span>
            <h2 id="veh-title" className="display h2 reveal" data-reveal>
              <span className="line">
                <span>{t.vehicles.title}</span>
              </span>
            </h2>
          </div>
        </div>
        <ul className="tiles" data-rise data-reveal>
          {site.vehicles.map((v, i) => (
            <li key={v} style={{ ['--i' as string]: i }}>
              <a className="tile" href="#tyres" onClick={() => setVehicle(v)}>
                <Pic
                  photo={site.photos.vehicles[v]}
                  alt=""
                  w={480}
                  ratio={1.4}
                  widths={[320, 480, 640]}
                  sizes="(min-width: 1100px) 16vw, (min-width: 720px) 31vw, 47vw"
                />
                <span className="tile-body">
                  <span>
                    <h3>{t.vehicles.names[v]}</h3>
                    <small>{t.vehicles.see}</small>
                  </span>
                  <span className="arrow" aria-hidden="true">
                    <IconArrow />
                  </span>
                </span>
              </a>
            </li>
          ))}
          <li style={{ ['--i' as string]: site.vehicles.length }}>
            <a className="tile feature" href="#alloys">
              <Pic photo={site.photos.alloys} alt="" w={480} ratio={1.4} widths={[320, 480, 640]} sizes="(min-width: 1100px) 16vw, 47vw" />
              <span className="tile-body">
                <span>
                  <h3>{t.vehicles.alloys}</h3>
                  <small>13&Prime;–20&Prime;</small>
                </span>
                <span className="arrow" aria-hidden="true">
                  <IconArrow />
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
