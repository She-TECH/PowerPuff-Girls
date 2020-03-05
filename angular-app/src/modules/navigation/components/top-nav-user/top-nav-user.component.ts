import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/services';
import { User } from '../../../auth/models';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {

    public user:User;
    constructor() {
        this.user= UserService.user;
    }
    ngOnInit() {}
}
