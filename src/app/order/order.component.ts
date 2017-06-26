import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router'

import { RadioOption } from '../shared/radio/radio-option.model'
import { OrderService } from './order.service'
import { CartItem } from '../restaurants-detail/shopping-cart/cart-item.model'
import { Order, OrderItem } from './order.model'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value:'MON' },
    {label: 'Cartão de Debito', value:'DEB' },
    {label: 'Cartão Refeição', value:'REF' }
  ]

  orderForm: FormGroup

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
        name: this.formBuilder.control(''),
        email: this.formBuilder.control(''),
        emailConfirmation: this.formBuilder.control(''),
        adress: this.formBuilder.control(''),
        number: this.formBuilder.control(''),
        optionalAdress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('')
    })
  }

  itemsValue():number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return  this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    return this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.OrderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['order-summary'])
        this.orderService.clear()
    })
    console.log(order)
  }





}
