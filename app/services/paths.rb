module Paths
  def get_subforum_path(subforum)
    sub = subforum
    path = []
    while !sub.subforum_id.nil?
      path.push(sub)
      sub = Subforum.find_by(id: sub.subforum_id)
    end
    path.push(sub)
    path.reverse
  end
end