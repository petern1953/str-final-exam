import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> = this.userService.getAll();

  phraseControl: FormControl = new FormControl('');
  phrase: string = '';
  columnKey: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll();
    this.phraseControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((newValue) => (this.phrase = newValue));
  }

  onDelete(id: number): void {
    let response = confirm(`Is it OK to delete user: ${id}?`);
    if (response === true) {
      this.userService.remove(id);
    }
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnSelect(key: string): void {
      this.columnKey = key;
      this.phrase = '';
  }
}
