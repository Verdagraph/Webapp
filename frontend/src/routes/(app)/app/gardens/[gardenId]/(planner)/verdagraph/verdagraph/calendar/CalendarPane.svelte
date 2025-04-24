<script lang="ts">

    type CalendarItemSection = {
        label: string
        icon: string
        
    }

    type CalendarItem = {
        id: string
        label: string
        color: string
        sections: CalendarItemSection[]
    }
</script>