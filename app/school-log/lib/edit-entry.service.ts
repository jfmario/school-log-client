
import { Injectable } from '@angular/core';
import { Entry } from '../models/entry.model';

@Injectable()
export class EditEntryService {
    public currentEntry: Entry = null;
};
