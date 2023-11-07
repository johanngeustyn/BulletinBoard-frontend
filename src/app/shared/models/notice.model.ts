import { Comment } from '@models/comment.model';

export class Notice {
    _id: string;
    title: string;
    content: string;
    departments: string[];
    priority: string;
    status: string;
    tags: string[];
    author: string;
    comments: Comment[];
    createdAt: string;

    constructor() {
        this._id = '';
        this.title = '';
        this.content = '';
        this.departments = [];
        this.priority = '';
        this.status = '';
        this.tags = [];
        this.author = '';
        this.comments = [];
        this.createdAt = '';
    }
}