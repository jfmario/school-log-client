
import { Injectable } from '@angular/core';
import { Child } from '../models/child.model';

@Injectable()
export class EditStudentService {
    public currentStudent: Child = null;
};
