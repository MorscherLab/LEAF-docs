# Presets

A preset is a named snapshot of an extraction setup. Use presets to rerun a method with identical parameters, to keep one setup per column or matrix, or to hand a validated setup to other lab members.

Presets are managed from the **Presets** tab on the **Extract** page and are stored in LEAF's preset database.

## Contents of a preset

| Pipeline | Stored | Not stored |
|---|---|---|
| **Targeted** | All extraction parameters, the compound list, and tracing groups | Sample metadata, input files |
| **Untargeted** (v3d or ROI) | All extraction parameters for that engine | Sample metadata, input files |

Sample metadata belongs to the experiment. Load or rebuild it separately after loading a preset.

## Save the current setup

1. Configure the input controls, compound list, and tracing groups.
2. Open **Presets** and select **Save current as preset**.
3. Enter a name (up to 120 characters) and an optional description.
4. Choose visibility when sharing is available.
5. Select **Save preset**.

Names must be unique among your own presets. If the name is already in use, LEAF shows a warning and suggests an alternative.

### Visibility

| Visibility | Who can see and load it |
|---|---|
| **Private** | Only the owner |
| **Shared** | The owner and the selected collaborators |
| **Lab** | Every lab user |

Sharing is available when LEAF runs inside MINT. Standalone LEAF has one user, so every preset is private and visibility controls are hidden.

## Find a preset

Search by name and filter by pipeline: **Targeted**, **v3d**, or **ROI**. When sharing is available, **Private**, **Shared**, and **Lab** filter the list by visibility; a lab preset you own is listed under **Lab**.

Select a preset to review its parameters, compound count, owner, and creation date.

> [Screenshot: Presets tab with the list filtered to Targeted and one preset selected in the detail pane]

## Load a preset

1. Select the preset.
2. Select **Load preset**.
3. Review the diff between **Current** and **Preset** values.
4. Confirm, or choose **Save current first** to store the open setup as a new preset; the load resumes after saving.

Loading a targeted preset replaces the open parameters, compound list, and tracing groups. Loading an untargeted preset replaces the open untargeted parameters. If the open setup already matches the preset, LEAF reports that loading changes nothing.

After loading, the confirmation bar provides one-step **Undo**, which restores the setup that was open before the load.

### Presets from another pipeline

A preset loads only into the pipeline it was saved from. For a preset from another mode, **Switch to … and load** changes mode and loads it in one step.

- Switching between targeted and untargeted preserves the setup in the mode you leave.
- Switching between v3d and ROI replaces the current untargeted setup; **Undo** restores it.

## Maintain presets

Only the owner can modify a stored preset.

| Action | Effect |
|---|---|
| **Rename / edit description** | Change name, description, visibility, or collaborators |
| **Update from current settings** | Replace the stored snapshot with the open setup after a diff of **Stored** and **Will become** values |
| **Save as copy** | Create a new private preset owned by you; available to owners and non-owners |
| **Delete preset** | Remove the preset permanently |

Non-owners can load a shared or lab preset and edit the applied setup, but their edits do not change the stored preset. Use **Save as copy** to keep a modified version.

### Delete a preset

Deletion cannot be undone. It does not change the setup currently open.

When a preset has collaborators, the confirmation lists who will lose access and requires typing the preset name. Copies that collaborators already saved are not affected.

## Presets from earlier versions

Presets saved with the 0.7 run-config vocabulary may be unreadable in 0.8 and later. An unreadable preset cannot be loaded or copied. Recreate it from a current setup or from a generated 0.8 run config.

## Related

- [Extract — targeted](/workflow/extract)
- [Configure stable-isotope tracing](/workflow/tracing)
- [UI tour: Presets tab](/reference/ui-tour#presets-tab)
