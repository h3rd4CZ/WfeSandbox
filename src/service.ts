export default class Service {
  constructor(private msg: string) {}

  public Greet = () => console.log(this.msg);
}
