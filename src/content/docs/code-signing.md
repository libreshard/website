---
title: Code signing policy
description: How LibreShard's Windows releases are signed, who approves each signature, and what the app sends over the network.
---

:::note[Status]
Windows releases **aren't code-signed yet**. LibreShard is applying to
[SignPath Foundation](https://signpath.org/), which signs open-source projects for free. Until
signing starts, check each download against the `SHA256SUMS.txt` file published with the release
(the [FAQ](/docs/faq/) shows how). This page describes how signing will work, and will say so
here once it does.
:::

## Signing provider

Free code signing provided by [SignPath.io](https://about.signpath.io/), certificate by
[SignPath Foundation](https://signpath.org/).

The certificate belongs to SignPath Foundation, so Windows shows **SignPath Foundation** as the
publisher of signed files.

## What gets signed

- The Windows installer (`LibreShard-Setup-<version>.exe`) and the LibreShard program inside it.
- Only files built from the source code in
  [libreshard/libreshard](https://github.com/libreshard/libreshard), by GitHub Actions, from a
  release tag. Nothing built on a personal computer is ever signed.
- Linux and macOS packages aren't signed through SignPath. Check them against `SHA256SUMS.txt`.

## How a release is signed

1. A maintainer creates a version tag (`v*`). Only the project's administrators can create these
   tags.
2. GitHub Actions builds the installers from that tag
   ([release workflow](https://github.com/libreshard/libreshard/blob/main/.github/workflows/release.yml))
   and sends the Windows files to SignPath.
3. An approver checks that the request comes from that build and that tag, and approves it by hand.
   Every release needs its own approval.
4. The signed files go into a draft release, which a maintainer reviews and publishes.

## Team roles

| Role | Who |
|---|---|
| Committers and reviewers | [Members of the libreshard organization](https://github.com/orgs/libreshard/people): today, Gabriel Hernandez |
| Approvers | The organization's owners: today, Gabriel Hernandez |

Every change reaches the `main` branch through a pull request that passes the automated checks.
Contributions from people outside the team are reviewed by a team member before they're merged.
Team members use multi-factor authentication for GitHub and SignPath.

## Privacy

LibreShard will not transfer any information to other networked systems unless specifically
requested by the user or the person installing or operating it.

The app only talks to the devices you pair on your own network: there's no telemetry, no account
and no cloud service. If a future feature contacts the internet (automatic updates, for example),
this page will say what it contacts, and you'll be able to turn it off. The website's own privacy
notes are on the [security page](/security/#privacy).

## Report a problem

If a signed file looks wrong, or you think something was signed that shouldn't have been, write to
**[security@libreshard.com](mailto:security@libreshard.com)**.
