import graphene

class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        passsword = graphene.String()

    ok = graphene.Boolean()
    user = graphene.Field(lambda: User)

    def mutate(root,username,password):
        user = User(username=username,password=password)
        ok = True
        return CreateUser(user=user, ok=ok)
class User(graphene.ObjectType):
    username = graphene.String()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

class Query(graphene.ObjectType):
    user = graphene.Field(User)

    def resolve_user(root, info):
        return {'username': root.username}

schema = graphene.Schema(query=Query, mutation=Mutation)
