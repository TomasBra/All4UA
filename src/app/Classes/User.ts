import {Refugee} from './Refugee';

export class User {
  id: number;
  uid: string;
  name: string;
  description: string;
  phone: string;
  country: string;
  city: string;
  destination: string;
  need: string;
  count: number;
  countKids: number;
  password: string;
  dateLastseen: Date;
  dateFinished: Date;
  gpsLatitude: number;
  gpsLongitude: number;
  dateCreated: string;

  public GetGPS(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.gpsLatitude = position.coords.latitude;
        this.gpsLongitude = position.coords.longitude;
      });
    }
  }

  public SaveUser(): boolean {
    localStorage.setItem('user', JSON.stringify(this));
    return true;
  }

  public LoadUser(): User {
    let user: User = new User();
    const localstorage: string | null = localStorage.getItem('user');
    if (localstorage !== null) {
      user = JSON.parse(localstorage);
    } else {
      user = new User();
    }
    Object.assign(this, user);
    return this;
  }

  LoadFromUser(user: User): void {
    Object.assign(this, user);
  }

  async CanMakeChanges(Post: User): Promise<boolean> {
    let password: string | null = prompt('Enter password for deleting/editing post.');

    if (password != null) {
      await this.HashPassword(password).then(hashedPassword => password = hashedPassword);

      if (this.password === Post.password) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // not using
  DeleteItSelf(): void {
    localStorage.removeItem('user');
  }


  CanCreatePost(UsersSearchedByPhone: Array<User>): boolean {
    return !UsersSearchedByPhone.some(user => user.phone === this.phone);
  }

  HashPassword(password: string): Promise<string> {
    const utf8 = new TextEncoder().encode(password);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }


}
