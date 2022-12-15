---
sidebar_position: 20
---

# Service Objects

Service objects are Plain Old Ruby Objects (POROs) which encapsulate a whole
business process/user interaction. We rely on these objects in our codebase to remove complexity from the Models and Controller.

Our services are located in `app/services` with the corresponding specs in
`spec/services`.

## Naming Conventions for Service Objects

- We prefer to namespace our Service Objects especially when we potentially see the addition of more services under that namespace. This is adviseable rather than cluttering the root folder.
- We namespace services in a plural form to avoid running into problems with Rails naming conventions. For example `Reactions::` instead of `Reaction::`.
- To distinguish services from models we often follow the VerbNoun naming convention for services, like `HomePage::FetchArticles` instead of `HomePage::ArticleRetrieval`. However, sometimes the naming of the service may not require a verb to be present like `Search::Article`,and at other times services may not require a noun to be present like `ProfileFields::Add`. We recommend that you be cautious about conflicts with models when ommitting the verb or noun.
- We try to keep the namespaces to be the same across services, workers etc.

## .call Pattern

We’d like to use the .call pattern instead of using a custom method name.

For example: We'd prefer `result = ProfileFields::Add.call` vs `result = ProfileFields::Add.result`.

# Skeleton of a Service Object

Most Services Objects will contain the following skeleton:

```ruby
class ImportUsers
  def self.call(arg1)
    new(arg1).call
  end

  def initialize(arg1)
    @arg1 = arg1
  end

  def call
    # import code goes here
  end
end
```

## Generating Service Objects

To make our services more consistent we use a custom Rails generator. Some usage
examples:

### Generate a non-namespaced service

`$ rails generate service DoTheThing`

```ruby
# app/services/do_the_thing.rb
class DoTheThing
  def self.call
    new.call
  end

  def call
  end
end
```

```ruby
# spec/services/do_the_thing_spec.rb
require "rails_helper"

RSpec.describe DoTheThing, type: :service do
  pending "add some examples to (or delete) #{__FILE__}"
end
```

If there are arguments for your service you can generate it as follows:

```$ rails generate service DoTheThing arg1 arg2```

### Generate a namespaced service

`$ rails generate service things/dothem arg1 arg2`

```ruby
# app/services/things/do_them.rb
class Things::DoThem
  def self.call(arg1, arg2)
    new(arg1, arg2).call
  end

  def initialize(arg1, arg2)
    @arg1 = arg1
    @arg2 = arg2
  end

  def call
  end
end
```

```ruby
# spec/services/things/do_them_spec.rb
require "rails_helper"

RSpec.describe Things::DoThem, type: :service do
  pending "add some examples to (or delete) #{__FILE__}"
end
```