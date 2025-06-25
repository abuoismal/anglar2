export interface Iregister {
  name: string;
  email: string;
  password: string;
  repassword: string;

}
export interface ilogin {

  email: string;
  password: string;
}
export interface IProducts {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  popular: boolean;
  isaddtocart: boolean;
}
