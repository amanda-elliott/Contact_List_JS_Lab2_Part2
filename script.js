"use strict";

window.onload = function () {


    class Contact {
        constructor(name, email, phone, relation) {
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.relation = relation;
        }
    }


    class AddressBook {
        constructor() {
            this.contacts = [
                // new Contact("Amanda", "amanda@me.com", "555-5555", "me"),
                // new Contact("Cane", "cane@dog.com", "111-1111", "my dog"),
                // new Contact("Rajah", "rajah@dog.com", "222-2222", "my dog")
            ];
        }

        add(info) {
            this.contacts = [...this.contacts, info];
        }

        deleteAt(index) {
            this.contacts = [...this.contacts.slice(0, index), ...this.contacts.slice(index + 1)];
        }

        display() {
            document.querySelector(".contactList").innerHTML = "";
            let count = 0;
            for (let contact of this.contacts) {
                const newEntry = document.createElement("div");
                newEntry.setAttribute("index", count);
                newEntry.classList.add("contact_box");
                newEntry.innerHTML = `
                <p>Name: ${contact.name}</p>
                <p>Email: ${contact.email}</p>
                <p>Phone: ${contact.phone}</p>
                <p>Relation: ${contact.relation}</p>
                <i class="material-icons">delete</i>
                `;
                document.querySelector(".contactList").append(newEntry);
                count++;
            }
        }
    }

    const book = new AddressBook();

    document.querySelector("form").addEventListener("submit", addContact);

    function addContact(event) {
        event.preventDefault();
        let inputElements = document.querySelectorAll("input");
        const info = new Contact(inputElements[0].value,
            inputElements[1].value,
            inputElements[2].value,
            inputElements[3].value
        );

        book.add(info);

        for (let input of inputElements) {
            input.value = "";
        }
        book.display();
    }


    document.querySelector("main").addEventListener("click", deleteContact);

    function deleteContact(event) {
        if (event.target.classList.contains("material-icons")) {
            const index = event.target.parentNode.getAttribute("index");
            book.deleteAt(index);
            book.display();
        }
    }
}