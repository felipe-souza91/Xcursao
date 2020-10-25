import { NumericValueAccessor } from '@ionic/angular';

export interface Event {

    id?: number;
    title?: string;
    desc?: string;
    startTime?: Date;
    endTime?: Date;
    allDay?: false;
}
