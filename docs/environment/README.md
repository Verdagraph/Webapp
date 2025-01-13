# The Environment Feature Category

The Environment feature category allows updating the state of the model with measurements from the outside world, such as temperature, rainfall, and pictures. This feature integrates closely with the [Devices](/outline/devices/README.md), which act allow connection of environmental variables to external APIs.


# EnvironmentAttributeProfiles

Gardens should be able to define attributes of the physical environment. These should not entirely define the environments that Workspaces represent, but contextualize them and provide a base set of attributes to inherit.

## FrostDateProfile

Frost dates are a widely used heuristic for constructing planting calendars. The EcoTemporalAttributes defined in the Plants feature category use these to define acceptable planting windows.

### first_frost_date

The first frost date is the expected first day in the year to have frost.

### last_frost_date

The last frost date is the expected last day in the year to have frost. 