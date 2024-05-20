import {Fragment, useEffect, useState} from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    ShoppingCartIcon,
    UserIcon

} from '@heroicons/react/24/outline'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import axios from "axios";
import {Link} from "react-router-dom";
import logoWeb from "/public/img/logo.png"
import Instance from "@/configs/instance.js";
const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
};
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [cartItem,setCart]= useState([])
    const [getCategory, setCategory]= useState([])
    const fetchCategory=()=>{
        Instance.get("/api/Category/Index").then((response) => {
            const dataUser = response.data;
            setCategory(dataUser);
        }).catch((err)=>console.log(err))
    }
    useEffect(() => {
        fetchCategory()
    }, []);
    const fetchCart=()=>{
        Instance.get("/api/Cart/Show-cart").then((response) => {
            const dataUser = response.data;
            setCart(dataUser);
        }).catch((err)=>console.log(err))
    }

    useEffect(() => {
        fetchCart()
    }, []);
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/home" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Cart</span>
                        <img className="h-20 w-auto" src={logoWeb} alt="logo" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <Popover.Button
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Category
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {getCategory.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                            <div className="flex-auto">
                                                <a href={`/home/category/${item.categoryId}`} className="block font-semibold text-gray-900">
                                                    {item.categoryName}
                                                    <span className="absolute inset-0"/>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">

                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>


                    <Link to="order" className="text-sm font-semibold leading-6 text-gray-900">
                        Order
                    </Link>
                    <Link to="profile" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
                        <UserIcon className="h-6 w-6 mr-1" />
                        Profile
                    </Link>
                    <Link to="cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
                        <div className="flex items-center">
                            <ShoppingCartIcon className="h-6 w-6 mr-1" />
                            <span className="mr-2">Cart</span>
                        </div>
                        {cartItem.length > 0 && (
                            <span className="bg-gray-900 text-white rounded-full px-2 py-1 text-xs">{cartItem.length}</span>
                        )}
                    </Link>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/login">
                    <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
                        Log out <span aria-hidden="true">&rarr;</span>
                    </button>
                    </Link>
                </div>
            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Cart</span>
                            <img
                                className="h-12 w-auto"
                                src={logoWeb}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Product
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...products, ...callsToAction].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <Link
                                    to="profile"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to={"order"}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Order
                                </Link>
                                <Link
                                    to={"cart"}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Cart
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link to="/login">
                                <button type="submit"
                                        onClick={handleLogout}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Log out
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
