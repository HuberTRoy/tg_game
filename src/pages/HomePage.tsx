import { useMemo, useState } from "react";

type GainFx = {
  id: number;
  x: number;
  y: number;
};

const TAP_GAIN = 5;

const mockHomeData = {
  balance: 671_218_022_563,
  oreName: "Copper Ore",
  afkLeft: "09:33",
  boost: 5,
  freeSpinLeft: 5,
  freeSpinTotal: 5,
  energy: 5_000,
  energyMax: 10_000_000_000,
};

export function HomePage() {
  const tg = useMemo(() => window.Telegram?.WebApp, []);
  const [balance, setBalance] = useState(mockHomeData.balance);
  const [energy, setEnergy] = useState(mockHomeData.energy);
  const [isAfkEnabled, setIsAfkEnabled] = useState(true);
  const [gains, setGains] = useState<GainFx[]>([]);

  const handleTap = () => {
    setBalance((prev) => prev + TAP_GAIN);
    setEnergy((prev) => Math.min(mockHomeData.energyMax, prev + TAP_GAIN));
    tg?.HapticFeedback?.impactOccurred("light");

    const id = Date.now() + Math.floor(Math.random() * 1000);
    setGains((prev) => [
      ...prev,
      {
        id,
        x: 14 + Math.random() * 72,
        y: 18 + Math.random() * 66,
      },
    ]);
    window.setTimeout(() => {
      setGains((prev) => prev.filter((item) => item.id !== id));
    }, 700);
  };

  const progress = Math.round((energy / mockHomeData.energyMax) * 100);

  return (
    <>
      <section className="balance-row">
        <img className="coin-img" src="/coin.png" alt="coin" />
        <strong>{new Intl.NumberFormat("en-US").format(balance)}</strong>
      </section>

      <section className="ore-zone">
        <button type="button" className="ore-button" onClick={handleTap}>
          <img className="ore-img" src="/ore_copper.png" alt="ore" />
          {gains.map((gain) => (
            <span
              key={gain.id}
              className="gain-fx"
              style={{
                left: `${gain.x}%`,
                top: `${gain.y}%`,
              }}
            >
              +5
            </span>
          ))}
        </button>
      </section>

      <section className="afk-panel">
        <button
          type="button"
          className="afk-toggle"
          onClick={() => setIsAfkEnabled((prev) => !prev)}
        >
          Enable AFK{" "}
          <span className="check">{isAfkEnabled ? "[x]" : "[ ]"}</span>
        </button>
        <p className="afk-time">
          <img className="time-img" src="/time.png" alt="time" />
          {mockHomeData.afkLeft} left
        </p>
      </section>

      <section className="ore-meta">
        <div className="ore-label">{mockHomeData.oreName}</div>
        <div className="boost-block">
          <strong>{mockHomeData.boost}x</strong>
          <span>Boost</span>
          <small>{mockHomeData.afkLeft}</small>
        </div>
      </section>

      <section className="energy-panel">
        <div className="energy-track">
          <div className="energy-fill" style={{ width: `${progress}%` }} />
          <div className="energy-bubble">
            {mockHomeData.energy.toLocaleString()}
          </div>
        </div>
        <p>
          {new Intl.NumberFormat("en-US").format(energy)} /{" "}
          {new Intl.NumberFormat("en-US").format(mockHomeData.energyMax)}
        </p>
      </section>

      <section className="multiplier-panel">
        <button type="button" className="multiplier-item is-hot">
          <img className="socket-img" src="/socket.png" alt="socket" />
        </button>
        <button type="button" className="multiplier-item">
          3X
        </button>
        <button type="button" className="multiplier-item">
          5X
        </button>
        <div className="free-spin">
          FREE SPIN
          <small>
            {mockHomeData.freeSpinLeft}/{mockHomeData.freeSpinTotal}
          </small>
        </div>
      </section>
    </>
  );
}
