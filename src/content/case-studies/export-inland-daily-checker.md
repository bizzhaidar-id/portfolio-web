---
title: "Export Inland Daily Checker"
category: digital
order: 3
role: "Designer and builder"
method: "Built with AI (Claude)"
summary: "A browser tool that compares the outstanding delivery list with the trucking plan and flags every delivery that is not planned yet, so nothing gets skipped."
metric: "0 skipped"
metricLabel: "deliveries left unplanned, the goal of every daily check"
tags: [AI-built tool, Claude, Daily control, Exception management]
tool: daily-checker
---

## Starting point

Every day the export trucking team has to make sure each outstanding delivery has a place in the trucking plan (the DCR). The check was done by hand: the outstanding list on one side, the plan on the other, and Supervisor and Manager reviewing the booking confirmation (BOC) and DCR line by line.

With hundreds of open deliveries, a manual check is slow and easy to get wrong. When a delivery slips through, it risks being **skipped** instead of being shipped out early.

## Root cause

The information existed, but in two separate files that nobody could compare at a glance:

- The outstanding list says what still needs to move.
- The plan list says what is already arranged.
- The gap between the two, the deliveries that are **outstanding but not planned**, was never shown anywhere. It had to be found by eye.

## Solution

A small tool that does the comparison in seconds. Upload the outstanding list and the plan file, and it shows:

- how many deliveries are planned and how many are not, by count and by tonnage
- which shipping points carry the unplanned load
- plan entries that do not match any outstanding delivery (already shipped, cancelled or a data error)
- a sortable table with vessel, terminal opening and closing times, and an export of the unplanned list

How it was delivered:

1. **Identify and brainstorm** the gap with the team.
2. **Build the tool with AI.** It was built with Claude, without a software developer.
3. **Assess the tool** against real daily files.
4. **Trial and improve** with the users.
5. **Launch and implement** in the daily routine.
6. **Standardize** it as part of the daily check.

Files are processed in the browser only. Nothing is uploaded to a server.

## Before and after

- **Before:** no platform, the check was manual, and deliveries could be skipped.
- **After:** a daily checker flags unplanned deliveries to the Supervisor, so discrepancies are visible at a glance and BOC/DCR checks are faster.

## Try it

The demo on the Tools page runs the same logic on dummy data. Edit the plan list and watch deliveries move between planned and not planned.
