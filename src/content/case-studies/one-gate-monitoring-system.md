---
title: "One Gate Monitoring System"
category: improvement
order: 2
period: "Jun – Oct 2025"
slides: "/case-studies/one-gate-monitoring-system.pdf"
role: "Project lead"
method: "SGA 8-step PDCA"
summary: "Replaced manual delivery reports with an automated Power BI platform fed from SAP. Daily monitoring went from three 30-minute rounds to one minute, and OTIF and stuffing balance both improved in the first month live."
metric: "90 → 1 min"
metricLabel: "daily delivery monitoring"
tags: [SGA, PDCA, Power BI, SAP S/4HANA, Automation, OTIF]
kpis:
  - label: "Daily monitoring time"
    before: 90
    after: 1
    unit: " min"
    lower: true
    note: "3 × 30 min of manual reporting vs 1 min on the dashboard"
  - label: "OTIF shipment"
    before: 88
    after: 90
    unit: "%"
    note: "Jan–Sep 2025 average vs Oct 2025"
  - label: "Even stuffing"
    before: 74
    after: 78
    unit: "%"
    note: "Jan–Sep 2025 average vs Oct 2025"
  - label: "Monitoring automation"
    before: 0
    after: 100
    unit: "%"
    note: "Target set at project start"
---

## Starting point

Delivery monitoring ran on manual reports. Data was collected and cleaned by hand from several sources, three times a day, about 30 minutes each round. By the time a report was ready, the picture was already old.

The cost showed up in delivery performance: **OTIF shipment had never reached 90%**.

The target:

- **Specific:** automated, continuous delivery monitoring
- **Measurable:** automation level from 0% to 100%
- **Achievable:** the in-house team already had Power BI skills
- **Reasonable:** OTIF shipment had never reached 90%
- **Time-bound:** five months, June to October 2025

## Root cause

A 4M analysis found four causes, and three of them came down to information arriving too late:

1. **Machine: monitoring was delayed and not responsive.** Data processing was manual and there was no platform for continuous monitoring.
2. **Method: delivery projections were inaccurate.** Departure dates (ETD) were not updated in the system early enough.
3. **Method: non-OTIF was detected too late.** There was no real-time OTIF calculation to flag ETD gaps while there was still time to act.
4. **Method: the stuffing plan was uneven.** Schedules were not aligned with loading capacity, and the load was never projected ahead.

## Solution

One Gate is a single Power BI platform fed automatically from SAP S/4HANA, with one countermeasure for each cause:

1. **Continuous monitoring.** An automated data feed replaces manual collection and cleaning.
2. **ETD matching.** Departure dates are synced early, so projections are accurate.
3. **Real-time OTIF and goods in transit.** OTIF is calculated live, and non-OTIF deliveries and goods in transit are flagged early.
4. **Stuffing load projection.** A projected trend evens out the load against loading capacity.

Delivery ran in five phases, with **100% of planned tasks completed**: initiate (June), plan (June to July), build and validate (July to September), monitor (September to October), then go-live and roll-out (October).

## Results

October 2025, the first full month with the platform live, compared with the January to September 2025 average:

- **Daily monitoring time:** from three 30-minute rounds to about one minute.
- **OTIF shipment:** from 88% to 90%, the first time it reached 90%.
- **Even stuffing:** from 74% to 78%.
- **Sales volume and export delivery:** both up 12.6%.

This is one month of data, so the trend still needs to hold. The monitoring time saving does not depend on market conditions, so it carries over to every month.

## Standardize and roll out

The new way of working is documented in a dashboard user guide, a delivery and shipment arrangement SOP, and an expedite-to-fastest-schedule instruction. The platform was shared with **all mill logistics teams and corporate logistics**.

Next steps: extend the scope past DN-out, track vendor allocation, and quantify the cost of delays.

## What this shows

The team was not missing effort. It was missing time: problems became visible after the window to fix them had closed. Building the monitoring first made every other improvement possible.
