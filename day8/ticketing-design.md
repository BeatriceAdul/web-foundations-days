# TicketHub Event Ticketing System Design

## 1. Requirements

TicketHub is a website that allows users to browse events, view available seats, reserve seats, pay for tickets, and view tickets they have purchased.

### Functional Requirements

The system must allow users to:

1. Browse upcoming concerts and events.
2. View information about an event, including its date, venue, and available seats.
3. View the seating layout and see which seats are available.
4. Temporarily hold available seats while completing payment.
5. Pay for held seats.
6. Receive tickets after successful payment.
7. View their purchased tickets.
8. Prevent two users from purchasing the same seat.
9. Release seats when a user's hold expires without payment.

### Non-Functional Requirements

#### Speed

Normal browsing requests should respond quickly, ideally within a few hundred milliseconds.

During a popular concert sale, the system should remain responsive even when many users arrive at the same time.

#### Correctness

The system must never sell the same seat to two different users.

Payments and ticket purchases must be recorded consistently.

A failed payment must not result in a permanently sold seat.

#### Fairness

Users competing for limited seats should be treated fairly.

The system should not allow one user to repeatedly hold large numbers of seats and prevent everyone else from purchasing.

Seat holds should expire after a limited amount of time.

#### Availability

The system should remain available during normal traffic and major ticket-sale events.

#### Security

Users must only be able to view and manage their own orders and tickets.

Payment information should be handled securely and sensitive payment details should not be stored directly in the TicketHub database.

---

# 2. Scale Estimates

TicketHub has:

- 2 million registered users.
- 50,000 visitors on a normal day.
- Each visitor views approximately 10 pages.
- 5,000 tickets are sold on a normal day.
- A popular concert can have 200,000 people trying to buy 20,000 seats within 10 minutes.

## Normal Traffic

There are:

50,000 visitors × 10 pages

= 500,000 page views per day.

There are approximately 86,400 seconds in a day.

500,000 ÷ 86,400

≈ 6 page requests per second on average.

Therefore, normal traffic is approximately:

**6 requests per second on average.**

There are 5,000 ticket sales per day.

5,000 ÷ 86,400

≈ 0.06 ticket purchases per second on average.

Ticket purchases are therefore much less frequent than browsing requests.

## Big Sale Traffic

During the popular concert sale:

200,000 people try to buy tickets within 10 minutes.

10 minutes = 600 seconds.

200,000 ÷ 600

≈ 333 people per second.

Therefore, the system may experience approximately:

**333 users per second attempting to buy tickets.**

The concert has only 20,000 seats.

20,000 ÷ 600

≈ 33 seats sold per second if seats were sold evenly throughout the sale.

The important difference is that normal traffic is only a few requests per second, while the big sale can create hundreds of simultaneous requests.

The system therefore needs to be designed for the large spike rather than only normal traffic.

---

# 3. API Design

TicketHub uses a REST API.

## Browse Events

### GET /api/events

Returns a list of upcoming events.

Example response:

```json
{
  "events": [
    {
      "id": 101,
      "name": "Summer Music Festival",
      "date": "2027-06-20",
      "venue": "National Stadium"
    }
  ]
}
```
