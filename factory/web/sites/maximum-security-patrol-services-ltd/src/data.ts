import type { Layer } from "./Plan"

export const SERVICES: { k: Layer; t: string; d: string; who: string }[] = [
  { k: "officers", t: "Trained security officers", d: "Officers on post for everyday and special applications: gates, lobbies, banking halls, stores and events.", who: "Banks, offices, retail, government buildings" },
  { k: "patrol", t: "Patrols", d: "Officers who move: rounds of a property or a group of sites, checking each point on the way.", who: "Car parks, compounds, estates, after-hours sites" },
  { k: "alarm", t: "Alarm monitoring", d: "Alarms at your premises watched by the company, so an alert is followed up rather than left ringing.", who: "Stores, offices, homes" },
  { k: "investigations", t: "Investigations", d: "When something goes wrong: an incident looked into and reported, so you know what happened and what to change.", who: "Businesses and private clients" },
  { k: "consultancy", t: "Consultancy", d: "A look at your site and how it is protected today, with customised arrangements for situations that need a special response.", who: "New sites, changing risks, special events" },
]
