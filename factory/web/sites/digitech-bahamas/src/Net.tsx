import { motion } from "motion/react"

export type Plan = { pos: number; pcs: number; staffWifi: boolean; guestWifi: boolean; server: boolean; backup: boolean }
const INK = "#0e1726", SIG = "#0a8f6a", MUTED = "#8a94a3"

function Node({ x, y, label, sub, tone = "line", w = 132 }: { x: number; y: number; label: string; sub?: string; tone?: "line" | "ink" | "sig"; w?: number }) {
  const fill = tone === "ink" ? INK : tone === "sig" ? SIG : "#ffffff"
  const text = tone === "line" ? INK : "#ffffff"
  return (
    <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: `${x}px ${y}px` }}>
      <rect x={x - w / 2} y={y - 24} width={w} height={48} rx={12} fill={fill} stroke={tone === "line" ? "#d5dbe3" : "none"} />
      <text x={x} y={sub ? y - 2 : y + 5} textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="14" fontWeight="600" fill={text}>{label}</text>
      {sub && <text x={x} y={y + 14} textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="11" fill={tone === "line" ? MUTED : "#cfe9df"}>{sub}</text>}
    </motion.g>
  )
}

function Link({ d, id, live = true }: { d: string; id: string; live?: boolean }) {
  return (
    <g>
      <motion.path id={id} d={d} fill="none" stroke={live ? INK : "#d5dbe3"} strokeOpacity={live ? 0.35 : 1} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} />
      {live && <circle r="3.5" fill={SIG}><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href={`#${id}`} /></animateMotion></circle>}
    </g>
  )
}

/** A live sketch of the network Digitech would design: firewall and VPN, a switch, VLANs for POS, staff and guests, a server and cloud backup. */
export default function Net({ plan, className = "" }: { plan: Plan; className?: string }) {
  const branches = [
    plan.pos > 0 && { key: "pos", label: `${plan.pos} POS station${plan.pos > 1 ? "s" : ""}`, sub: "POS VLAN" },
    plan.pcs > 0 && { key: "pcs", label: `${plan.pcs} office PC${plan.pcs > 1 ? "s" : ""}`, sub: "Cabled, certified" },
    plan.staffWifi && { key: "staff", label: "Staff Wi-Fi", sub: "Private VLAN" },
    plan.guestWifi && { key: "guest", label: "Guest Wi-Fi", sub: "Isolated VLAN" },
    plan.server && { key: "server", label: "Virtual server", sub: "Hosted, managed" },
  ].filter(Boolean) as { key: string; label: string; sub: string }[]
  const n = Math.max(branches.length, 1)
  const xs = branches.map((_, i) => 80 + ((640 - 160) / Math.max(n - 1, 1)) * i + (n === 1 ? 240 : 0))
  return (
    <svg viewBox="0 0 640 420" className={className} role="img" aria-label="Diagram of a business network: internet, firewall with VPN, switch, and connected POS stations, office computers, Wi-Fi networks, server and cloud backup.">
      <defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#d5dbe3" /></pattern></defs>
      <rect width="640" height="420" fill="url(#dots)" />
      <Link id="l-fw" d="M110 60 L270 60" />
      {plan.backup && <Link id="l-bk" d="M370 60 L530 60" />}
      <Link id="l-sw" d="M320 84 L320 170" />
      {branches.map((b, i) => <Link key={b.key} id={`l-${b.key}`} d={`M320 218 C320 270 ${xs[i]} 260 ${xs[i]} 316`} />)}
      <Node x={80} y={60} label="Internet" w={110} />
      <Node x={320} y={60} label="Firewall" sub="VPN for remote staff" tone="ink" w={150} />
      {plan.backup && <Node x={560} y={60} label="Cloud backup" sub="Off site" tone="sig" w={130} />}
      <Node x={320} y={194} label="Network switch" sub="Multi-VLAN" tone="ink" w={160} />
      {branches.map((b, i) => <Node key={b.key} x={xs[i]} y={340} label={b.label} sub={b.sub} w={n > 4 ? 112 : 132} />)}
      {branches.length === 0 && <text x="320" y="345" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="14" fill={MUTED}>Add devices to draw your network</text>}
    </svg>
  )
}
