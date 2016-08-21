
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Child } from '../models/child.model';
import { Entry } from '../models/entry.model';
import { EntryQuery } from '../models/entry.query';

@Injectable()
export class SchoolLogService {

    private baseUrl =
        'http://ec2-54-191-90-8.us-west-2.compute.amazonaws.com/school-log';
    private childrenUrl = this.baseUrl + '/children';
    private entriesUrl = this.baseUrl + '/entries';

    public children: Child[] = [];
    public currentEntries: Entry[] = [];
    public subjects: String[] = [];

    constructor ( private http: Http ) {}

    private handleError ( error: any ) {
        console.error ( 'An error occurred', error );
    }

    /**
     * Sends a GET request to /children.
     * @param   token   String The user's auth token
     * @returns Child[]        A list of Children
     */
    public getChildren ( token: String )
    {
        var self = this;
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.get ( this.childrenUrl, { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                self.children = response.json () as Child [];
                return self.children;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a GET request to /children/:id.
     * @param   token   String The user's auth token
     * @param   childId String The id of the Child to get
     * @returns Child          The specific Child
     */
    public getChild ( token: String, childId: String )
    {

        var url = this.childrenUrl + '/' + childId;

        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.get ( url, { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                return response.json () as Child;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a POST request to /children.
     * @param   token   String The user's auth token
     * @param   child   Child  The child object to save
     * @returns Boolean        True if Child was saved, otherwise false
     */
    public createChild ( token: String, child: Child )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.post ( this.childrenUrl, JSON.stringify ( child ),
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                if ( response.status == 201 ) return true;
                return false;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a PUT request to /children/:id.
     * @param   token   String The user's auth token
     * @param   childId String The id of the Child to update
     * @param   child   Child  The Child with updated information
     * @returns Boolean        True if the Child was update, otherwise False
     */
    public updateChild ( token: String, childId: String, child: Child )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.put ( this.childrenUrl + '/' + childId,
            JSON.stringify ( child ),
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                if ( response.status == 204 ) return true;
                else return false;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a DELETE request to /children/:id.
     * @param   token   String The user's auth token
     * @param   childId String The id of the Child to delete
     * @returns Boolean        True if the Child was deleted, otherwise False
     */
    public deleteChild ( token: String, childId: String )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.delete ( this.childrenUrl + '/' + childId,
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                if ( response.status == 200 ) return true;
                else return false;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a POST request to /entries.
     * @param   token   String The user's auth token
     * @param   entry   Entry  The Entry object to save
     * @returns Boolean        True if Entry was saved, otherwise false
     */
    public createEntry ( token: String, entry: Entry )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.post ( this.entriesUrl, JSON.stringify ( entry ),
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                if ( response.status == 201 ) return true;
                return false;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a POST request to /entries/query.
     * @param   token   String      The user's auth token
     * @param   query   EntryQuery  The Entry object to save
     * @returns Entry[]             A list of matching Entries
     */
    public queryEntries ( token: String, query: EntryQuery )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.post ( this.entriesUrl + '/query', JSON.stringify ( query ),
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                return response.json () as Entry [];
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a PUT request to /entries/:id.
     * @param   token   String The user's auth token
     * @param   entryId String The id of the Entry to update
     * @param   entry   Entry  The Entry with updated information
     * @returns Boolean        True if the Entry was updated, otherwise False
     */
    public updateEntry ( token: String, entryId: String, entry: Entry )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.put ( this.entriesUrl + '/' + entryId,
            JSON.stringify ( entry ),
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                if ( response.status == 204 ) return true;
                else return false;
            })
            .catch ( this.handleError );
    }
    /**
     * Sends a DELETE request to /entries/:id.
     * @param   token   String The user's auth token
     * @param   entryId String The id of the Entry to delete
     * @returns Boolean        True if the Entry was deleted, otherwise False
     */
    public deleteEntry ( token: String, entryId: String )
    {
        let headers = new Headers ({
            'Content-Type': 'application/json',
            'X-Auth': token
        });
        return this.http.delete ( this.entriesUrl + '/' + entryId,
            { headers: headers } )
            .toPromise ().then ( function ( response )
            {
                if ( response.status == 200 ) return true;
                else return false;
            })
            .catch ( this.handleError );
    }
}
