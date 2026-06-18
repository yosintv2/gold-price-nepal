import Link from 'next/link';
import type { GoldDay } from '@/lib/api';
import { formatNPR, apiDateToDisplay } from '@/lib/utils';

type GoldType = 'hallmark' | 'tajabi' | 'silver';

interface Props {
  day: GoldDay;
  highlight?: GoldType;
  showDate?: boolean;
}

const ROWS: { key: GoldType; label: string; subLabel: string; href: string }[] = [
  {
    key: 'hallmark',
    label: 'Hallmark Gold',
    subLabel: 'Fine Gold 9999 · 24K',
    href: '/hallmark-gold-price-nepal/',
  },
  {
    key: 'tajabi',
    label: 'Tejabi Gold',
    subLabel: 'Standard purity',
    href: '/tejabi-gold-price-nepal/',
  },
  {
    key: 'silver',
    label: 'Silver',
    subLabel: 'Chandi',
    href: '/silver-price-nepal/',
  },
];

export default function PriceTable({ day, highlight, showDate = false }: Props) {
  return (
    <div className="price-table-wrap">
      {showDate && (
        <p className="price-table-date">
          Rates for <strong>{apiDateToDisplay(day.date)}</strong>
        </p>
      )}
      <table className="price-table" aria-label="Gold and Silver Prices Nepal">
        <thead>
          <tr>
            <th>Type</th>
            <th>Per Tola <span className="th-sub">(तोला)</span></th>
            <th>Per 10g <span className="th-sub">(१० ग्राम)</span></th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map(({ key, label, subLabel, href }) => (
            <tr key={key} className={highlight === key ? 'row-highlight' : undefined}>
              <td>
                <Link href={href} className="price-row-link">
                  <span className="price-row-name">{label}</span>
                  <span className="price-row-sub">{subLabel}</span>
                </Link>
              </td>
              <td className="price-cell">{formatNPR(day[key].tola)}</td>
              <td className="price-cell">{formatNPR(day[key].gram10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
